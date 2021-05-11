import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { TagGroupedModel } from '../models/TagGroupedModel';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('divState', [
     state('show', style({ 'min-height': 'fit-content'})),
     state('hide', style({ height: '0vh'})),
     transition('show => hide', animate('200ms ease-out')),
     transition('hide => show', animate('300ms ease-in'))
    ])
   ]
})
export class HomeComponent implements OnInit {
  public divStates: Array<string>;
  public groupedArticles: Array<TagGroupedModel> = [];

  constructor(private articlesService: ArticlesService) {}

  getColor(elemIndex: number): string {
    const redColor = '#f47038';
    const turquoiseColor = '#4bbec5';
    const greenColor = '#8ec63f';
    const yellowColor = '#f5d114';

    if (elemIndex % 4 === 0){
      return redColor;
    }
    else if ((elemIndex - 1) % 4 === 0){
      return turquoiseColor;
    }
    else if ((elemIndex - 2) % 4 === 0){
      return greenColor;
    }
    else {
      return yellowColor;
    }
  }

  showDiv(elemIndex: number): void {
    this.divStates[elemIndex] = 'show';
  }

  closeMe(elemIndex: number): void {
    this.divStates[elemIndex] = 'hide';
  }

  ngOnInit(): void {
    this.articlesService.getGroupedByTag().subscribe((data: Array<TagGroupedModel>) => {
      const states = [];
      this.groupedArticles = data;
      this.groupedArticles.forEach(_ => {
        states.push('hide');
      });
      this.divStates = states;
    });
  }
}
