import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Poll } from '../models/Poll';
import { NotificationService } from '../services/notification.service';
import { PollsService } from '../services/polls.services';
import { Option } from '../models/Option';

@Component({
  selector: 'app-edit-poll',
  templateUrl: './edit-poll.component.html',
  styleUrls: ['./edit-poll.component.css']
})
export class EditPollComponent implements OnInit {
  public saving = false;
  public id: string;
  pollForm: FormGroup;
  poll: Poll;

  constructor(
    private pollsService: PollsService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  addOption(): void {
    this.poll.options.push(new Option(""));
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  deleteOption(index: number):void {
    this.poll.options.splice(index, 1);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    })
    this.pollsService.getById(this.id).subscribe((poll: Poll)=>{
      this.poll = poll;
      this.pollForm = this.formBuilder.group({
        name: new FormControl(this.poll.name),
        doesAllowMultiple: new FormControl(this.poll.doesAllowMultiple)
      });
    })
  }

  save(form) {
    if (!form.valid) {
      return;
    }

    this.saving = true;
    const poll: Poll = this.pollForm.value;
    poll.options = this.poll.options;
    poll.id = this.id;
    let message: string;

    this.pollsService
      .put(poll)
      .pipe(
        finalize(() => {
          this.saving = false;
          this.notificationService.displayMessage(message);
        })
      )
      .subscribe({
        next: () => {
          message = 'The poll was successfully updated!';
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
