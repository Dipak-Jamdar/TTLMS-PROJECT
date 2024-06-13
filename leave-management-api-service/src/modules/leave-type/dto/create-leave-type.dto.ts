import { IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';

export class CreateLeaveTypeDto {
  @IsNotEmpty()
  name: string;

  description: string;

  @IsNotEmpty()
  @IsBoolean()
  is_active: boolean;

  @IsNotEmpty()
  @IsNumber()
  created_by: number;

  @IsNotEmpty()
  @IsNumber()
  updated_by: number;
}
