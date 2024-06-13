import { Controller, Post, Body, Put, Param, Get, Patch, Delete } from '@nestjs/common';
import { UserLeavesService } from './user_leaves.service';
import { CreateUserLeafDto } from './dto/create-user_leaf.dto';
import { UpdateUserLeafDto } from './dto/update-user_leaf.dto';

@Controller('user-leaves')
export class UserLeavesController {
  constructor(private readonly userLeavesService: UserLeavesService) {}

  @Post()
  async create(@Body() createUserLeafDto: CreateUserLeafDto) {
    console.log("Request received: Create User Leave, User ID:", createUserLeafDto.assignedToId);
    return this.userLeavesService.create(createUserLeafDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserLeafDto: UpdateUserLeafDto) {
    return await this.userLeavesService.update(id, updateUserLeafDto);
  }

  @Get('todaysLeave')
  findAll() {
    return this.userLeavesService.findTodaysApprovedLeaves();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userLeavesService.remove(+id);
  }

  @Get('pending')
  findPendingLeaves(): Promise<any[]> {
    return this.userLeavesService.findPendingLeaves();
  }

  @Patch(':id/status/:status')
  updateLeaveStatus(@Param('id') id: number, @Param('status') status: string): Promise<void> {
    console.log("Request received: Update Leave Status, ID:", id, "Status:", status);
    return this.userLeavesService.updateLeaveStatus(id, status);
  }
}
