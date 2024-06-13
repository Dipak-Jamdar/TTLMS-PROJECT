import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeaveType } from 'src/shared/entities/leave-type.entity';
import { User } from 'src/shared/entities/user.entity';
import { UpdateLeaveTypeDto } from './dto/update-leave-type.dto';
import { CreateLeaveTypeDto } from './dto/create-leave-type.dto';

@Injectable()
export class LeaveTypeService {

  constructor(
    @InjectRepository(LeaveType) private readonly leaveTypeRepo: Repository<LeaveType>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  
  async create(createLeaveTypeDto: CreateLeaveTypeDto): Promise<LeaveType> {
    const { name, description, is_active, created_by, updated_by } = createLeaveTypeDto;

    // Find the user who created the leave type
    const createdByUser = await this.userRepo.findOne({ where: { id: created_by } });
    if (!createdByUser) {
      throw new NotFoundException(`User with ID ${created_by} not found`);
    }

    // Find the user who updated the leave type
    const updatedByUser = await this.userRepo.findOne({ where: { id: updated_by } });
    if (!updatedByUser) {
      throw new NotFoundException(`User with ID ${updated_by} not found`);
    }

    // Create a new LeaveType instance and set its properties
    const leaveType = new LeaveType();
    leaveType.name = name;
    leaveType.description = description;
    leaveType.is_active = is_active;
    leaveType.created_by = createdByUser;
    leaveType.updated_by = updatedByUser;
    leaveType.created_at = new Date();
    leaveType.updated_at = new Date();

    // Save the created LeaveType and return it
    return await this.leaveTypeRepo.save(leaveType);
  }

  async update(id: number, updateLeaveTypeDto: UpdateLeaveTypeDto): Promise<LeaveType> {
    // Find the LeaveType instance to update
    const leaveType = await this.leaveTypeRepo.findOne({ where: { id } });
    if (!leaveType) {
      throw new NotFoundException(`LeaveType with ID ${id} not found`);
    }

    // Update the leaveType object with the new data
    Object.assign(leaveType, updateLeaveTypeDto);
    leaveType.updated_at = new Date();

    // Save and return the updated LeaveType
    return await this.leaveTypeRepo.save(leaveType);
  }
 
    async findAll(): Promise<Partial<LeaveType>[]> {
      return await this.leaveTypeRepo.find({
        select: ['id', 'name'],
      });
      }

  findOne(id: number) {
    return `This action returns a #${id} leaveType`;
  }

  // update(id: number, updateLeaveTypeDto:any) {
  //   return `This action updates a #${id} leaveType`;
  // }

  remove(id: number) {
    return `This action removes a #${id} leaveType`;
  }
}
