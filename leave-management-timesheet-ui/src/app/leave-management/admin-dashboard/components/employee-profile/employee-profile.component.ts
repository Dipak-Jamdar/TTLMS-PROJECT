import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../../../components/services/master.service';
import { Employee } from '../employee/employee.component';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {

  employee:any

  constructor(private masterService: MasterService) {}

  ngOnInit(): void {
    // Assuming `getEmployeeById` is a method in `MasterService` that fetches an employee by ID
    this.masterService.getEmployeeById().subscribe((data: Employee) => {  // You might need to pass the correct ID
      this.employee = data;
    });
  }
}
