import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Holiday } from 'src/shared/entities/holiday.entity';
import { Repository } from 'typeorm';
import { User } from 'src/shared/entities/user.entity';
import { Location } from 'src/shared/entities/location.entity';

@Injectable()
export class HolidaysService {
  constructor(@InjectRepository(Holiday) private readonly holidayRepo:Repository<Holiday>,
@InjectRepository(User)private readonly userRepo:Repository<User>,
@InjectRepository(Location)private readonly locationRepo:Repository<Location>){}
  
async create(createHolidayDto: CreateHolidayDto): Promise<Holiday> {
  const { occasion, occasion_date, location_name, is_optional, created_by_id } = createHolidayDto;

  const user = await this.userRepo.findOne({ where: { id: created_by_id } });
  const location = await this.locationRepo.findOne({ where: { name: location_name } });

  if (!user) {
    throw new NotFoundException(`User with ID ${created_by_id} not found`);
  }

  if (!location) {
    throw new NotFoundException(`Location with name ${location_name} not found`);
  }

  const holiday = this.holidayRepo.create({
    occasion,
    occasion_date,
    location,
    is_optional,
    created_by: user,
    updated_by: user,
    created_at: new Date(),
    updated_at: new Date(),
  });

  return await this.holidayRepo.save(holiday);
}



async update(id: number, updateHolidayDto: UpdateHolidayDto): Promise<Holiday> {
  const holiday = await this.holidayRepo.findOne({ where: { id } });

  if (!holiday) {
    throw new NotFoundException(`Holiday with ID ${id} not found`);
  }

  if (updateHolidayDto.updated_by_id) {
    const user = await this.userRepo.findOne({ where: { id: updateHolidayDto.updated_by_id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${updateHolidayDto.updated_by_id} not found`);
    }
    holiday.updated_by = user;
  }

  if (updateHolidayDto.location_name) {
    const location = await this.locationRepo.findOne({ where: { name: updateHolidayDto.location_name } });
    if (!location) {
      throw new NotFoundException(`Location with name ${updateHolidayDto.location_name} not found`);
    }
    holiday.location = location;
  }

  Object.assign(holiday, updateHolidayDto);
  holiday.updated_at = new Date();

  return await this.holidayRepo.save(holiday);
}



  async findAll():Promise<Holiday[]> {
    return await this.holidayRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} holiday`;
  }

  // update(id: number, updateHolidayDto: UpdateHolidayDto) {
  //   return `This action updates a #${id} holiday`;
  // }

  remove(id: number) {
    return `This action removes a #${id} holiday`;
  }
}
