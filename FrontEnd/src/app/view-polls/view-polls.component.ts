import { Component, OnInit } from '@angular/core';
import { Poll } from './../models/Poll';
import { PollsService } from './../services/polls.services';
import { Option } from './../models/Option';
import { NotificationService } from '../services/notification.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-polls',
  templateUrl: './view-polls.component.html',
  styleUrls: ['./view-polls.component.css']
})
export class ViewPollsComponent implements OnInit {
  polls: Array<Poll>;
  deleting: boolean;
  constructor(private pollService: PollsService, private notificationService: NotificationService, private router: Router) {

  }

  ngOnInit(): void {
    this.pollService.get().subscribe((data: Array<Poll>) => {
      this.polls = data;
    });
  }

  makeVote(pollId: string, optionId: string): void{
    this.pollService.makeVote(pollId, optionId).subscribe((data: Array<Option>) => {
      this.polls.find(poll => poll.id == pollId).options = data;
    });
  }

  trackByy(index, item){
    return item.name + index + item.value;
  }

  edit(id: string){
    this.router.navigateByUrl("/edit-poll?id=" + id);
  }

  public delete(id: string): void {
    this.deleting = true;
    let message = '';

    this.pollService.delete(id).pipe(
      finalize(() => {
        this.deleting = false;
        this.notificationService.displayMessage(message);
      })
    ).subscribe({
      next: (_) => {
        message = 'The poll was successfully deleted!';
        var i = this.polls.length;

        while(i--){
          if(this.polls[i].id == id){
            this.polls.splice(i, 1);
          }
        }
      },
      error: (_) => {
        message = _.error?.message ?? 'Something went wrong. Please, try again later!';
      }
    });
  }
}
