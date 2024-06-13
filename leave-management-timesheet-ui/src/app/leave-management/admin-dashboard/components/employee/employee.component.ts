import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../../../components/services/master.service';
import { Router } from '@angular/router';
export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile_no: string;
  country_code: string;
  is_active: boolean;
  location: number;
  date_of_joining: Date;
  created_by: number;
  updated_by: number;
  created_at: Date;
  updated_at: Date;
}
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  selectedEmployee: Employee | null = null;
  visible: boolean = true;
  employees: Employee[] = [];

  constructor(private masterService: MasterService, private router: Router) {}

  ngOnInit(): void {
    this.masterService.getEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
      if (data.length > 0) {
        console.log('First employee:', data[0]);
      }
    });
  }

  
  navigateToEmployeeDetails(employeeId: number): void {

    // alert(employeeId);
    this.masterService.setSelectedEmployeeID(employeeId);
    this.router.navigate(['/leave-management/admin-dashboard/employee-profile', employeeId]); 
    // Adjust the route as per your configuration
    this.visible = false; // Hide the employee page when navigating to details

  }

}
