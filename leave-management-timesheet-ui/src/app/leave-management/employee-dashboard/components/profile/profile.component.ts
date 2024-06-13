import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../../../components/services/master.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  user:any

  ngOnInit(): void {
    this.fetchUserDetails();
  }


  constructor(private masterService:MasterService){}

  fetchUserDetails(): void {
    this.masterService.getUserDetails().subscribe(
      (data: any) => {
        console.log(data)
        this.user = data; // Assign user details to the 'user' variable
      },
      (error: any) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
}
