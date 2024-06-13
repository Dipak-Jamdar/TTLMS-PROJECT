import { IsOptional, IsNotEmpty, IsBoolean ,IsNumber} from 'class-validator';

export class UpdateLeaveTypeDto {
  @IsOptional()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsBoolean()
  is_active: boolean;

  @IsOptional()
  @IsNumber()
  updated_by: number;
}
