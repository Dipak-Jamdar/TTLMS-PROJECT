import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../../../components/services/master.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent implements OnInit{

  todaysLeaves: any[] = []; // Variable to store today's leaves
  holidays:any[]=[];

  constructor(private masterService:MasterService){}

  ngOnInit(): void {
    this.fetchTodaysLeaves();
    this.getHolidaysList();
  }


  fetchTodaysLeaves(): void {
    this.masterService.getTodaysLeaves().subscribe((data: any[]) => {
      this.todaysLeaves = data;
      console.log(data);
    });
  }

  getHolidaysList(): void {
    this.masterService.getHolidays().subscribe((data: any[]) => {
      this.holidays = data;
      console.log(data);
    });
  }

}
