import { Component, OnInit } from '@angular/core';
import { HowToArticlesService } from '../services/how-to-articles.service';
import { HowToArticleModel } from '../models/HowToArticleModel';
import { ActivatedRoute } from '@angular/router';
import { map, filter, tap, finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { HowToArticleCreateComponent } from '../how-to-article-details/how-to-article-create/how-to-article-create.component';
import { NotificationService } from '../services/notification.service';
import { HowToArticleEditComponent } from '../how-to-article-details/how-to-article-edit/how-to-article-edit.component';

@Component({
  selector: 'app-how-to-articles-list',
  templateUrl: './how-to-articles-list.component.html',
  styleUrls: ['./how-to-articles-list.component.css']
})
export class HowToArticlesListComponent implements OnInit {
  public howToArticles: Array<HowToArticleModel>;
  public isOpened: Array<boolean>;
  public deleting = false;

  constructor(
    private howToArticlesService: HowToArticlesService,
    private notificationService: NotificationService,
    private route: ActivatedRoute, private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.pipe(map(params => params.get('search') ?? ''))
      .subscribe(searchQuery => this.updateArticles(searchQuery));
  }

  public open(index: number): void {
    this.isOpened[index] = true;
  }

  public close(index: number): void {
    this.isOpened[index] = false;
  }

  public delete(article: HowToArticleModel): void {
    this.deleting = true;
    let message = '';

    this.howToArticlesService.delete(article).pipe(
      finalize(() => {
        this.deleting = false;
        this.notificationService.displayMessage(message);
      })
    ).subscribe({
      next: (_) => {
        message = 'The article was successfully deleted!';
        this.updateArticles();
      },
      error: (_) => {
        message = _.error?.message ?? 'Something went wrong. Please, try again later!';
      }
    });
  }

  public openAddDialog(): void {
    const dialog = this.dialog.open(HowToArticleCreateComponent, {
        width: '70%'
    });
    dialog.afterClosed().pipe(
      filter(wasModified => wasModified),
      tap(() => this.updateArticles())
    ).subscribe();
  }

  public openEditDialog(article: HowToArticleModel): void {
    const dialog = this.dialog.open(HowToArticleEditComponent, {
      width: '70%',
      data: article
    });
    dialog.afterClosed().pipe(
      filter(updatedArticle => updatedArticle)
    ).subscribe(updatedArticle => {
      article.name = updatedArticle.name;
      article.problem = updatedArticle.problem;
      article.solution = updatedArticle.solution;
    });
  }

  private updateArticles(query: string = ''): void {
    this.howToArticlesService.getAll(query).subscribe((data: HowToArticleModel[]) => {
        this.howToArticles = data;
        this.isOpened = new Array<boolean>(data.length).fill(false);
      });
  }
}
