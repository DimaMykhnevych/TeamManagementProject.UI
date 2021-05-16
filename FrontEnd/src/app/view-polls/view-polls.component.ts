import { Component, OnInit } from '@angular/core';
import { Poll } from './../models/Poll';
import { PollsService } from './../services/polls.services';
import { Option } from './../models/Option';

@Component({
  selector: 'app-view-polls',
  templateUrl: './view-polls.component.html',
  styleUrls: ['./view-polls.component.css']
})
export class ViewPollsComponent implements OnInit {
  polls: Array<Poll>;
  constructor(private pollService: PollsService) {

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

}
