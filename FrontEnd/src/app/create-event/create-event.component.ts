import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';
import { UserModel } from './../models/UserModel';
import { EventsService } from './../services/events.service';
import { IdentityService } from './../services/identity.service';
import { EventModel } from '../models/EventModel';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  public saving = false;
  teamMembers: Array<UserModel>;
  chosedTeamMembers: Array<UserModel> = new Array<UserModel>();
  eventForm: FormGroup;
  users: Array<UserModel> = new Array<UserModel>();
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public color: ThemePalette = 'primary';

  constructor(
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private eventService: EventsService,
    private identityService: IdentityService
  ) {}

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      title: new FormControl(''),
      description: new FormControl(''),
      passcode: new FormControl(''),
      url: new FormControl(''),
      dateTime: new FormControl(null)
    });

    this.identityService.getTeamMembers().subscribe((users: Array<UserModel>) => {
      this.teamMembers = users;
    })
  }

  save(form) {
    if (!form.valid) {
      return;
    }

    this.saving = true;
    let message: string;
    let eventt: EventModel = this.eventForm.value;
    eventt.attendies = this.chosedTeamMembers;

    this.eventService
      .create(eventt)
      .pipe(
        finalize(() => {
          this.saving = false;
          this.notificationService.displayMessage(message);
        })
      )
      .subscribe({
        next: () => {
          message = 'The event was successfully saved!';
          this.router.navigateByUrl(`/home`);
        },
        error: (errors: HttpErrorResponse) => {
          if (errors.error !== undefined) {
            message = Object.values(errors.error).join(', ');
          } else {
            message = 'Internal server error. Please, try again later';
          }
        },
      });
  }

}
