import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';import { CalendarOptions } from '@fullcalendar/core';
import { MasterService } from '../../../../components/services/master.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    height: 'auto',
    navLinks: true,
    events: [],
    eventContent: (arg) => {
      // This function allows you to customize the rendering of each event
      return { html: `<div class="event-title">${arg.event.title}</div>` };
    }
  };

  constructor(private masterService: MasterService) {}

  ngOnInit(): void {
    this.loadHolidays();
  }

  loadHolidays(): void {
    this.masterService.getHolidays().subscribe(holidays => {
      const events = holidays.map(holiday => ({
        title: holiday.occasion,
        start: holiday.occasion_date
      }));
      this.calendarOptions.events = events;
    });
  }
}