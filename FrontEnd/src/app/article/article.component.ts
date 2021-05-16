import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../services/articles.service';
import { ArticleModel } from '../models/ArticleModel';
import { NotificationService } from '../services/notification.service';
import { finalize } from 'rxjs/operators';
import { AppState } from '../services/app.state';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  public article: ArticleModel;
  public deleting = false;
  public id: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articlesService: ArticlesService,
    private notificationService: NotificationService,
    private appstate: AppState
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.id = id;

      this.articlesService.getById(id).subscribe({
        next: article => this.article = article,
        error: _ => this.article = null
      });
    });
  }

  onEdit() {
    this.router.navigateByUrl(`article/${this.id}/edit`);
  }

  public onDelete(): void {
    this.deleting = true;
    let message = '';

    this.articlesService.delete(this.article).pipe(
      finalize(() => {
        this.deleting = false;
        this.notificationService.displayMessage(message);
      })
    ).subscribe({
      next: (_) => {
        message = 'The article was successfully deleted!';
        this.router.navigate(['/home']);
        this.appstate.articlesChanged.next(true);
      },
      error: (_) => {
        message = _.error?.message ?? 'Something went wrong. Please, try again later!';
      }
    });
  }
}
