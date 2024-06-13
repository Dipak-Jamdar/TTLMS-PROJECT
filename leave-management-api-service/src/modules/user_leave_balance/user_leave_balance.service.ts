import { Injectable } from '@nestjs/common';
import { CreateUserLeaveBalanceDto } from './dto/create-user_leave_balance.dto';
import { UpdateUserLeaveBalanceDto } from './dto/update-user_leave_balance.dto';

@Injectable()
export class UserLeaveBalanceService {
  create(createUserLeaveBalanceDto: CreateUserLeaveBalanceDto) {
    return 'This action adds a new userLeaveBalance';
  }

  findAll() {
    return `This action returns all userLeaveBalance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userLeaveBalance`;
  }

  update(id: number, updateUserLeaveBalanceDto: UpdateUserLeaveBalanceDto) {
    return `This action updates a #${id} userLeaveBalance`;
  }

  remove(id: number) {
    return `This action removes a #${id} userLeaveBalance`;
  }
}
