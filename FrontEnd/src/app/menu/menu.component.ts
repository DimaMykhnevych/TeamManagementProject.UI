import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../services/articles.service';
import { IdentityService } from '../services/identity.service';
import { TagGroupedModel } from '../models/TagGroupedModel';
import { UserModel } from '../models/UserModel';
import { ArticleMenuModel } from './../models/ArticleMenuModel';
import { AppState } from './../services/app.state';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  public boolToggled: Array<boolean> = [];
  public groupedArticles: Array<TagGroupedModel> = [];
  public userArticles: Array<ArticleMenuModel> = [];
  public userArticlesToggle = false;
  public isAdmin: boolean;

  public click(index: number): void {
    this.boolToggled[index] = !this.boolToggled[index];
  }

  public clickUserArticle(): void {
    this.userArticlesToggle = !this.userArticlesToggle;
  }

  constructor(private articlesService: ArticlesService, private identityService: IdentityService, private appstate: AppState) { }

  ngOnInit(): void {
    this.appstate.articlesChanged.subscribe(value => {
      this.articlesService.getGroupedByTag().subscribe((data: Array<TagGroupedModel>) => {
        this.groupedArticles = data;
        this.groupedArticles.forEach(_ => {
          this.boolToggled = [];
          this.boolToggled.push(false);
        });
      });
      this.articlesService.getForCurrentUser().subscribe((data: Array<ArticleMenuModel>) => {
        this.userArticles = data;
        this.userArticlesToggle = false;
      });
    });
    this.identityService.getUser().subscribe((user: UserModel) => this.isAdmin = user.isAdmin);
  }

}
