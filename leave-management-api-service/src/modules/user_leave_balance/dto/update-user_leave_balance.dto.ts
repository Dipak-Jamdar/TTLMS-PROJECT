import { PartialType } from '@nestjs/mapped-types';
import { CreateUserLeaveBalanceDto } from './create-user_leave_balance.dto';

export class UpdateUserLeaveBalanceDto extends PartialType(CreateUserLeaveBalanceDto) {}
