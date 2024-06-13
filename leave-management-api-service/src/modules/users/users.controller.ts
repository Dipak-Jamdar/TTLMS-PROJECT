import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/shared/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('post')
  create(@Body() createUserDto: CreateUserDto) {
    console.log("Received data on backend=================================================:", createUserDto);
    return this.usersService.create(createUserDto);
  }

  
  @Get()
  async findAll():Promise<User[]> {
    console.log("Request received");

     let data= this.usersService.findAll();
     console.log("Controlller Request full-fill"+data)
     return  data;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {

    console.log(id)
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id); // Should log 'number'
    return this.usersService.remove(id);
  }

  // @Get("login")
  // login(@Body()CreateUserDto:any){
  //   return this.usersService.login(CreateUserDto)

  // }



  @Get('role/admin')
  findAdmins(): Promise<{ id: number, first_name: string, last_name: string }[]> {
    return this.usersService.findAdmins();
  }
}
