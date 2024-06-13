import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from '../../../../components/services/master.service';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrl: './leave.component.css'
})
export class LeaveComponent implements OnInit {
  userId: number | null = null;
  userData: any;
  adminData: any;
  pendingLeaves: any[] = [];

  constructor(
    private masterService: MasterService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.adminData = this.masterService.getAdminId();
    this.fetchPendingLeaves();
  }

  // fetchUserData(): void {
  // }

  fetchPendingLeaves(): void {
    this.masterService.getPendingLeaves().subscribe((data: any[]) => {
      console.log("Data received from backend:", data); // Log received data
      this.pendingLeaves = data;
      console.log("Pending leaves after assignment:", this.pendingLeaves); // Log pending leaves array
    });
  }

  updateLeaveStatus(leaveId: number, status: string): void {
    // alert(leaveId+""+status)
    this.masterService.updateLeaveStatus(leaveId, status).subscribe(() => {
      this.fetchPendingLeaves(); // Refresh the list after updating status
    });
  }


  
}
