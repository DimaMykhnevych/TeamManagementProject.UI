import { Component, OnInit, Inject } from '@angular/core';
import { IHowToArticleDetails } from '../IHowToArticleDetails';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { HowToArticlesService } from 'src/app/services/how-to-articles.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HowToArticleModel } from 'src/app/models/HowToArticleModel';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-how-to-article-edit',
  templateUrl: '../how-to-article-details.component.html',
  styleUrls: ['../how-to-article-details.component.css']
})
export class HowToArticleEditComponent implements OnInit, IHowToArticleDetails {
  public readonly title = 'Edit How-To Article';
  public readonly form: FormGroup;
  public processing = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public article: HowToArticleModel,
    private dialogRef: MatDialogRef<HowToArticleEditComponent>,
    private howToArticlesService: HowToArticlesService,
    private notificationService: NotificationService,
    formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      name: article.name,
      problem: article.problem,
      solution: article.solution
    });
   }

  ngOnInit(): void {
  }

  onSave(): void {
    const article: HowToArticleModel = this.form.value;
    let message: string;

    this.processing = true;
    this.howToArticlesService.edit(this.article.id, article).pipe(
      finalize(() => {
        this.notificationService.displayMessage(message);
        this.processing = false;
      })
    ).subscribe({
      next: (_) => {
        message = 'The article was successfully edited!';
        this.dialogRef.close(article);
      },
      error: (_) => {
        message = _.error?.message ?? 'Something went wrong. Please, try again later!';
      }
    });
  }
}
