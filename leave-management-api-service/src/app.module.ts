import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './modules/health/health.module';
import { routes } from './route';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './modules/users/users.module';
import { UserrolesModule } from './modules/userroles/userroles.module';
import { LocationsModule } from './modules/locations/locations.module';
import { RolesModule } from './modules/roles/roles.module';
import { UserLeavesModule } from './modules/user_leaves/user_leaves.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './shared/entities/role.entity';
import { UserRole } from './shared/entities/userrole.entity';
import { Holiday } from './shared/entities/holiday.entity';
import { CompanyLeave } from './shared/entities/company_leaf.entity';
import { LeaveType } from './shared/entities/leave-type.entity';
import { Location } from './shared/entities/location.entity';
import { Notification } from './shared/entities/notificatio.entity';
import { NotificationConfig } from './shared/entities/notification_config.entity';
import { NotificationTemplate } from './shared/entities/notification_template.entity';
import { NotificationType } from './shared/entities/notification_type.entity';
import { User } from './shared/entities/user.entity';
import { UserLeave } from './shared/entities/user_leaf.entity';
import { UserLeaveBalance } from './shared/entities/user_leave_balance.entity';
import { HolidaysModule } from './modules/holidays/holidays.module';
import { LeaveTypeModule } from './modules/leave-type/leave-type.module';
import { CompanyLeavesModule } from './modules/company_leaves/company_leaves.module';
import { NotificationTypeModule } from './modules/notification_type/notification_type.module';
import { NotificationConfigModule } from './modules/notification_config/notification_config.module';
import { NotificationTemplatesModule } from './modules/notification_templates/notification_templates.module';
import { AuthModule } from './modules/auth/auth.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'ttlms',
      entities: [Role, UserRole, Holiday, CompanyLeave, LeaveType,Location,Notification,
        NotificationConfig,NotificationTemplate,NotificationType, User,UserLeave, UserLeaveBalance],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Role, UserRole, Holiday, CompanyLeave, LeaveType,Location,Notification,
      NotificationConfig,NotificationTemplate,NotificationType, User,UserLeave, UserLeaveBalance/*, other entities */]),


   
    AuthModule,
    HolidaysModule,
    CompanyLeavesModule,
    NotificationTypeModule,
    NotificationTemplatesModule,
    HealthModule,
    NotificationConfigModule,
    SharedModule,
    RouterModule.register(routes), 
    UserrolesModule,
    LocationsModule,
    RolesModule,
    UserLeavesModule,
    UserLeavesModule,
    RolesModule,
    LeaveTypeModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
