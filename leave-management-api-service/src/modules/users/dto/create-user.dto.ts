import { IsString, IsEmail, IsNotEmpty, IsBoolean, IsDate, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  mobile_no: string;

  @IsString()
  @IsNotEmpty()
  country_code: string;

  @IsBoolean()
  is_active: boolean;

  @IsInt()
  @IsNotEmpty()
  location_id: number;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  date_of_joining: Date;

  @IsInt()
  @IsNotEmpty()
  created_by: number;

  @IsInt()
  @IsNotEmpty()
  updated_by: number;

  @IsDate()
  @Type(() => Date)
  created_at: Date;

  @IsDate()
  @Type(() => Date)
  updated_at: Date;
}
