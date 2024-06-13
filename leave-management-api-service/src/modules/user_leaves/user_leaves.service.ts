import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserLeafDto } from './dto/create-user_leaf.dto';
import { UpdateUserLeafDto } from './dto/update-user_leaf.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLeave } from 'src/shared/entities/user_leaf.entity';
import { Repository } from 'typeorm';
import { CompanyLeave } from 'src/shared/entities/company_leaf.entity';
import { User } from 'src/shared/entities/user.entity';
import { LeaveType } from 'src/shared/entities/leave-type.entity';



@Injectable()
export class UserLeavesService {
  constructor(
    @InjectRepository(UserLeave)
    private readonly userLeaveRepository: Repository<UserLeave>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(CompanyLeave)
    private readonly companyLeaveRepository: Repository<CompanyLeave>,
    @InjectRepository(LeaveType)
    private readonly leaveTypeRepository: Repository<LeaveType>,

  ) {}

  async create(createUserLeafDto: CreateUserLeafDto): Promise<UserLeave> {
    const user = await this.userRepository.findOne({ where: { id: createUserLeafDto.userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const leaveType = await this.leaveTypeRepository.findOne({ where: { name: createUserLeafDto.leaveTypeName } });
    if (!leaveType) {
      throw new NotFoundException('Leave Type not found');
    }

    const companyLeave = await this.companyLeaveRepository.findOne({ where: { leave_type: { id: leaveType.id } } });
    if (!companyLeave) {
      throw new NotFoundException('Company Leave not found');
    }

    const userLeave = new UserLeave();
    userLeave.user = user;
    userLeave.company_leave = companyLeave;
    userLeave.half_day = createUserLeafDto.halfDay;
    userLeave.to_date =createUserLeafDto.toDate;
    ;
    userLeave.assigned_to = createUserLeafDto.assignedToId ? await this.userRepository.findOne({ where: { id: createUserLeafDto.assignedToId } }):null;
    userLeave.status = createUserLeafDto.status;
    userLeave.is_auto_approved = false;
    userLeave.comments = createUserLeafDto.comments;
    userLeave.attachments = createUserLeafDto.attachments;
    userLeave.created_by = user;
    userLeave.updated_by = createUserLeafDto.updatedById ? await this.userRepository.findOne({ where: { id: createUserLeafDto.updatedById } }) : null;
    userLeave.created_at = new Date();
    userLeave.updated_at = new Date();
    userLeave.from_date =createUserLeafDto.fromDate;


    return await this.userLeaveRepository.save(userLeave);
  }

  async update(id: number, updateUserLeafDto: UpdateUserLeafDto): Promise<UserLeave> {
    const userLeave = await this.userLeaveRepository.findOne({ where: { id } });
    if (!userLeave) {
      throw new NotFoundException('User Leave not found');
    }

    const user = await this.userRepository.findOne({ where: { id: updateUserLeafDto.userId } });
    const companyLeave = await this.companyLeaveRepository.findOne({ where: { id: updateUserLeafDto.companyLeaveId } });

    if (!user || !companyLeave) {
      throw new NotFoundException('User or Company Leave not found');
    }

    userLeave.assigned_to = user;
    userLeave.attachments = updateUserLeafDto.attachments;
    userLeave.comments = updateUserLeafDto.comments;
    userLeave.company_leave = companyLeave;
    userLeave.from_date = updateUserLeafDto.fromDate;
    userLeave.half_day = updateUserLeafDto.halfDay;
    userLeave.is_auto_approved = updateUserLeafDto.isAutoApproved;
    userLeave.user = user;
    userLeave.to_date = updateUserLeafDto.toDate;
    userLeave.status = updateUserLeafDto.status;
    userLeave.updated_by = user;
    userLeave.updated_at = new Date();

    return await this.userLeaveRepository.save(userLeave);
  }

  async findTodaysApprovedLeaves(): Promise<any[]> {
    const today = new Date();
    const leaves = await this.userLeaveRepository
      .createQueryBuilder('userLeave')
      .leftJoinAndSelect('userLeave.user', 'user')
      .leftJoinAndSelect('userLeave.company_leave', 'companyLeave')
      .leftJoinAndSelect('companyLeave.leave_type', 'leaveType')
      .where('userLeave.status = :status', { status: 'Approved' })
      .andWhere('DATE(userLeave.from_date) = :today', { today: today.toISOString().slice(0, 10) })
      .getMany();

    const formattedLeaves = leaves.map(leave => ({
      userId: leave.user.id,
      userName: `${leave.user.first_name} ${leave.user.last_name}`,
      leaveType: leave.company_leave.leave_type.name,
    }));

    return formattedLeaves;
  }

  async findPendingLeaves(): Promise<any[]> {
    const data = await this.userLeaveRepository
      .createQueryBuilder('userLeave')
      .leftJoinAndSelect('userLeave.user', 'user')
      .leftJoinAndSelect('userLeave.company_leave', 'company_leave')
      .leftJoinAndSelect('company_leave.leave_type', 'leave_type')
      .where('userLeave.status = :status', { status: 'Pending' })
      .getMany();

    const formattedData = data.map(item => ({
      id: item.id,
      user: {
        id: item.user.id,
        name: `${item.user.first_name} ${item.user.last_name}`,
        country_code: item.user.country_code,
      },
      from_date: item.from_date,
      to_date: item.to_date,
      leave_type: item.company_leave.leave_type.name,
    }));

    return formattedData;
  }

  remove(id: number) {
    return `This action removes a #${id} userLeaf`;
  }

  async updateLeaveStatus(id: number, status: string): Promise<void> {
    await this.userLeaveRepository.update(id, { status });
  }
}
