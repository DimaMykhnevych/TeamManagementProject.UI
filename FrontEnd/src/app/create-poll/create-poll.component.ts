import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Poll } from '../models/Poll';
import { Option } from '../models/Option';
import { Tag } from '../models/Tag';
import { NotificationService } from '../services/notification.service';
import { PollsService } from './../services/polls.services';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {
  public saving = false;
  pollForm: FormGroup;
  options: Array<Option> = [ new Option("") ];

  constructor(
    private pollsService: PollsService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  addOption(): void {
    this.options.push(new Option(""));
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  deleteOption(index: number):void {
    this.options.splice(index, 1);
  }

  ngOnInit(): void {
    this.pollForm = this.formBuilder.group({
      name: new FormControl(''),
      doesAllowMultiple: new FormControl(false)
    });
  }

  save(form) {
    if (!form.valid) {
      return;
    }

    this.saving = true;
    const poll: Poll = this.pollForm.value;
    poll.options = this.options;
    let message: string;

    this.pollsService
      .create(poll)
      .pipe(
        finalize(() => {
          this.saving = false;
          this.notificationService.displayMessage(message);
        })
      )
      .subscribe({
        next: () => {
          message = 'The poll was successfully saved!';
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
