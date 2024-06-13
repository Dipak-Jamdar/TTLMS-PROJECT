import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../../../components/services/master.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  userDetails: any; // Property to store user details

  constructor(private masterService: MasterService) {}

  ngOnInit(): void {
    this.getData(); // Fetch user details on component initialization
  }

  getData(): void {
    this.masterService.getUserDetails().subscribe(
      details => {
        this.userDetails = details; // Store user details
      },
      error => {
        console.error('Error fetching user details:', error);
      }
    );
  }
}

