import { Module } from '@nestjs/common';
import { UserLeaveBalanceService } from './user_leave_balance.service';
import { UserLeaveBalanceController } from './user_leave_balance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.entity';
import { UserLeaveBalance } from 'src/shared/entities/user_leave_balance.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports:[TypeOrmModule.forFeature([User,UserLeaveBalance]),ScheduleModule.forRoot(),],
  controllers: [UserLeaveBalanceController],
  providers: [UserLeaveBalanceService],
})
export class UserLeaveBalanceModule {}
