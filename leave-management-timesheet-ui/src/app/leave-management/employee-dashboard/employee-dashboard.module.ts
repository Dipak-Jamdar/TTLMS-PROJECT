import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeDashboardRoutingModule } from './employee-dashboard-routing.module';
import { EmployeeDashboardComponent } from './employee-dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ApplyLeaveComponent } from './components/apply-leave/apply-leave.component';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
  declarations: [
    EmployeeDashboardComponent,
    NavbarComponent,
    SidebarComponent,
    ProfileComponent,
    ApplyLeaveComponent
  ],
  imports: [
    CommonModule,
    EmployeeDashboardRoutingModule,
    FormsModule,
    FullCalendarModule,
  ]
})
export class EmployeeDashboardModule { }
