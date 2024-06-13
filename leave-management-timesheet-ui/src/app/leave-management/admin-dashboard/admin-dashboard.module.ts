import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { LeaveComponent } from './components/leave/leave.component';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';
import { EmployeeTimeoffComponent } from './components/employee-timeoff/employee-timeoff.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPersonComponent } from './components/add-person/add-person.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    NavbarComponent,
    SidebarComponent,
    MainContentComponent,
    EmployeeComponent,
    CalendarComponent,
    LeaveComponent,
    EmployeeProfileComponent,
    EmployeeTimeoffComponent,
    AddPersonComponent,
  ],
  imports: [CommonModule, AdminDashboardRoutingModule,     FullCalendarModule
    ,FormsModule,ReactiveFormsModule],
})
export class AdminDashboardModule {}
