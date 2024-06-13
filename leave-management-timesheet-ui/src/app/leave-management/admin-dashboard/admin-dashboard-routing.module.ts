import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { LeaveComponent } from './components/leave/leave.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';
import { EmployeeTimeoffComponent } from './components/employee-timeoff/employee-timeoff.component';
import { AddPersonComponent } from './components/add-person/add-person.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      {
        path: 'employee',
        component: EmployeeComponent,
      },
      {
        path: 'calendar',
        component: CalendarComponent,
      },
      {
        path: 'leave',
        component: LeaveComponent,
      },
      {
        path: '',
        component: MainContentComponent,
      },
      {
        path: 'employee-profile/:id',
        component: EmployeeProfileComponent,
      },
      {
        path: 'employee-timeoff',
        component: EmployeeTimeoffComponent,
      },
      {
        path: 'add-person',
        component: AddPersonComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDashboardRoutingModule {}
