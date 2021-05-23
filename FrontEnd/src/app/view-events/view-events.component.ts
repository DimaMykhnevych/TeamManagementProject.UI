import { Component, OnInit } from '@angular/core';
import { GetEventModel } from './../models/GetEventModel';
import { EventsService } from './../services/events.service';
import { formatDate } from '@angular/common';
import * as moment from 'moment';
import { UserEventModel } from './../models/UserEventModel';
import { DateModel } from './../models/DateModel';

@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.css']
})
export class ViewEventsComponent implements OnInit {
  public events: Array<GetEventModel>;
  public datesDisplayed: Array<DateModel> = new Array<DateModel>();
  constructor(private eventsService: EventsService) {

  }

  ngOnInit(): void {
    this.eventsService.get().subscribe((data: Array<GetEventModel>) => {
      this.events = data;
    });
  }

  formatDate(date: Date){
    let formattedDate = (moment(date)).format('DD-MMM-YYYY HH:mm:ss');

    return formattedDate;
  }

  changeStatus(eventId: string, status: string, index: number){
    this.eventsService.changeAttending(eventId, status).subscribe((response: UserEventModel) => {
      this.events.find(ev => ev.id == eventId).attendies.find(at => at.id == response.id).status = status;
    });
  }

}
