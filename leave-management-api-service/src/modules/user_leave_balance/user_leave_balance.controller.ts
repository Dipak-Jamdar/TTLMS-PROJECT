import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserLeaveBalanceService } from './user_leave_balance.service';
import { CreateUserLeaveBalanceDto } from './dto/create-user_leave_balance.dto';
import { UpdateUserLeaveBalanceDto } from './dto/update-user_leave_balance.dto';

@Controller('user-leave-balance')
export class UserLeaveBalanceController {
  constructor(private readonly userLeaveBalanceService: UserLeaveBalanceService) {}

  @Post()
  create(@Body() createUserLeaveBalanceDto: CreateUserLeaveBalanceDto) {
    return this.userLeaveBalanceService.create(createUserLeaveBalanceDto);
  }

  @Get()
  findAll() {
    return this.userLeaveBalanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userLeaveBalanceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserLeaveBalanceDto: UpdateUserLeaveBalanceDto) {
    return this.userLeaveBalanceService.update(+id, updateUserLeaveBalanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userLeaveBalanceService.remove(+id);
  }
}
