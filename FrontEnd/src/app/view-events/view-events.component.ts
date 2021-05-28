import { Component, OnInit } from '@angular/core';
import { GetEventModel } from './../models/GetEventModel';
import { EventsService } from './../services/events.service';
import { formatDate } from '@angular/common';
import * as moment from 'moment';
import { UserEventModel } from './../models/UserEventModel';
import { DateModel } from './../models/DateModel';
import { finalize } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.css']
})
export class ViewEventsComponent implements OnInit {
  public events: Array<GetEventModel>;
  public datesDisplayed: Array<DateModel> = new Array<DateModel>();
  public dateChosen: Date;
  deleting: boolean;
  constructor(private eventsService: EventsService, private notificationService: NotificationService) {

  }

  ngOnInit(): void {
    this.eventsService.get(new Date()).subscribe((data: Array<GetEventModel>) => {
      this.events = data;
    });

    this.initializeDates(new Date());
  }

  formatDate(date: Date){
    let formattedDate = (moment(date)).format('DD-MMM-YYYY HH:mm:ss');

    return formattedDate;
  }

  initializeDates(date: Date){
    this.dateChosen = date;
    this.datesDisplayed = new Array<DateModel>();
    for(let i = 0; i <= 2; i++){
      let dateModel = new DateModel();
      let datee = new Date();
      if(i < 1){
        datee.setDate(date.getDate() - (1 - i))
      }
      else if(i > 1) {
        datee.setDate(date.getDate() + (i - 1))
      }
      else {
        datee.setDate(date.getDate());
      }
      dateModel.date = datee;
      dateModel.dateName = ('0' + datee.getDate()).slice(-2) + '/'
      + ('0' + (datee.getMonth()+1)).slice(-2) + '/'
      + datee.getFullYear();
      this.datesDisplayed[i] = dateModel;
    }
  }

  changeStatus(eventId: string, status: string, index: number){
    this.eventsService.changeAttending(eventId, status).subscribe((response: UserEventModel) => {
      this.events.find(ev => ev.id == eventId).attendies.find(at => at.id == response.id).status = status;
    });
  }

  click(index: number){
    this.eventsService.get(this.datesDisplayed[index].date).subscribe((events: Array<GetEventModel>) => {
      this.events = events;
    })
    
    this.initializeDates(this.datesDisplayed[index].date);
  }

  public delete(id: string): void {
    this.deleting = true;
    let message = '';

    this.eventsService.delete(id).pipe(
      finalize(() => {
        this.deleting = false;
        this.notificationService.displayMessage(message);
      })
    ).subscribe({
      next: (_) => {
        message = 'The event was successfully deleted!';
        var i = this.events.length;

        while(i--){
          if(this.events[i].id == id){
            this.events.splice(i, 1);
          }
        }
      },
      error: (_) => {
        message = _.error?.message ?? 'Something went wrong. Please, try again later!';
      }
    });
  }
}
