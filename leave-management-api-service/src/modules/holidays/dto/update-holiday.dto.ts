import { IsString, IsDate, IsBoolean, IsOptional } from 'class-validator';

export class UpdateHolidayDto {
  @IsString()
  @IsOptional()
  occasion?: string;

  @IsDate()
  @IsOptional()
  occasion_date?: Date;

  @IsString()
  @IsOptional()
  location_name?: string;

  @IsBoolean()
  @IsOptional()
  is_optional?: boolean;

  @IsOptional()
  updated_by_id?: number;
}
