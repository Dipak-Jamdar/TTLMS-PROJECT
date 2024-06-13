import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';
import { Location } from 'src/shared/entities/location.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Location)
    private readonly locationRepo: Repository<Location>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto)
    const location = await this.locationRepo.findOne({ where: { id: createUserDto.location_id } });
    if (!location) {
      throw new NotFoundException(`Location with ID ${createUserDto.location_id} not found`);
    }

     const createdByUser = await this.userRepository.findOne({ where: { id: createUserDto.created_by } });
    // if (!createdByUser) {
    //   throw new NotFoundException(`User with ID ${createUserDto.created_by} not found`);
    // }

    // const updatedByUser = await this.userRepository.findOne({ where: { id: createUserDto.updated_by } });
    // if (!updatedByUser) {
    //   throw new NotFoundException(`User with ID ${createUserDto.updated_by} not found`);
    // }

    const userdata = new User();
    userdata.first_name = createUserDto.first_name;
    userdata.last_name = createUserDto.last_name;
    userdata.email = createUserDto.email;
    userdata.mobile_no = createUserDto.mobile_no;
    userdata.country_code = createUserDto.country_code;
    userdata.is_active = createUserDto.is_active;
    userdata.location = location;
    userdata.date_of_joining = createUserDto.date_of_joining;
    userdata.created_by = createdByUser;
    userdata.updated_by = createdByUser;
    userdata.created_at = createUserDto.created_at;
    userdata.updated_at = createUserDto.updated_at;

    return this.userRepository.save(userdata);
  }

  // async findAll(): Promise<User[]> {
  //   return await this.userRepository.find({ relations: ['location', 'userRoles'] });
  // }

  // async findAll(): Promise<User[]> {
  //   return await this.userRepository.createQueryBuilder('user')
  //     .leftJoinAndSelect('user.location', 'location')
  //     .leftJoinAndSelect('user.userRoles', 'userRoles')
  //     .leftJoinAndSelect('userRoles.role', 'role')
  //     .where('role.name != :adminRole', { adminRole: 'admin' })
  //     .getMany();
  // }

  async findAll():Promise<User[]>{
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<any> {
    const userId = parseInt(id, 10);
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.location', 'location')
      .leftJoinAndSelect('user.userRoles', 'userRoles')
      .where('user.id = :id', { id: userId })
      .getOne();

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateUserDto.first_name) user.first_name = updateUserDto.first_name;
    if (updateUserDto.last_name) user.last_name = updateUserDto.last_name;
    if (updateUserDto.email) user.email = updateUserDto.email;
    if (updateUserDto.mobile_no) user.mobile_no = updateUserDto.mobile_no;
    if (updateUserDto.country_code) user.country_code = updateUserDto.country_code;
    if (updateUserDto.is_active !== undefined) user.is_active = updateUserDto.is_active;

    if (updateUserDto.location_id) {
      const location = await this.locationRepo.findOne({ where: { id: updateUserDto.location_id } });
      if (!location) {
        throw new NotFoundException(`Location with ID ${updateUserDto.location_id} not found`);
      }
      user.location = location;
    }

    if (updateUserDto.date_of_joining) user.date_of_joining = updateUserDto.date_of_joining;

    if (updateUserDto.created_by) {
      const createdByUser = await this.userRepository.findOne({ where: { id: updateUserDto.created_by } });
      if (!createdByUser) {
        throw new NotFoundException(`User with ID ${updateUserDto.created_by} not found`);
      }
      user.created_by = createdByUser;
    }

    if (updateUserDto.updated_by) {
      const updatedByUser = await this.userRepository.findOne({ where: { id: updateUserDto.updated_by } });
      if (!updatedByUser) {
        throw new NotFoundException(`User with ID ${updateUserDto.updated_by} not found`);
      }
      user.updated_by = updatedByUser;
    }

    if (updateUserDto.created_at) user.created_at = updateUserDto.created_at;
    if (updateUserDto.updated_at) user.updated_at = updateUserDto.updated_at;

    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<any> {
    return await this.userRepository.delete(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userRoles', 'userRole')
      .leftJoinAndSelect('userRole.role', 'role')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findAdmins(): Promise<{ id: number, first_name: string, last_name: string }[]> {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.userRoles', 'userRole')
      .leftJoin('userRole.role', 'role')
      .where('role.name = :roleName', { roleName: 'admin' })
      .select(['user.id', 'user.first_name', 'user.last_name'])
      .getMany();

    return users;
  }
}
