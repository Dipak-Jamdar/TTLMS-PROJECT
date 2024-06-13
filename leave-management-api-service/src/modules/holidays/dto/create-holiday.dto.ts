import { IsString, IsDate, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateHolidayDto {
  @IsString()
  @IsNotEmpty()
  occasion: string;

  @IsDate()
  @IsNotEmpty()
  occasion_date: Date;

  @IsString()
  @IsNotEmpty()
  location_name: string;

  @IsBoolean()
  @IsNotEmpty()
  is_optional: boolean;

  @IsNotEmpty()
  created_by_id: number;
}
