import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.entity';
import { Location } from 'src/shared/entities/location.entity';
import { LocationsModule } from '../locations/locations.module';
import { LocationsService } from '../locations/locations.service';

@Module({
  imports:[TypeOrmModule.forFeature([User,Location]), LocationsModule],
  controllers: [UsersController],
  providers: [UsersService, LocationsService],
  exports:[UsersService],
})
export class UsersModule {}
