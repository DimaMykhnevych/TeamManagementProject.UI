import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HowToArticleModel } from '../../models/HowToArticleModel';
import { HowToArticlesService } from '../../services/how-to-articles.service';
import { finalize } from 'rxjs/operators';
import { NotificationService } from '../../services/notification.service';
import { IHowToArticleDetails } from '../IHowToArticleDetails';

@Component({
  selector: 'app-how-to-article-create',
  templateUrl: '../how-to-article-details.component.html',
  styleUrls: ['../how-to-article-details.component.css']
})
export class HowToArticleCreateComponent implements OnInit, IHowToArticleDetails {
  public readonly title = 'Add New How-To Article';
  public readonly form: FormGroup;
  public processing = false;

  constructor(
    private dialogRef: MatDialogRef<HowToArticleCreateComponent>,
    private howToArticlesService: HowToArticlesService,
    private notificationService: NotificationService,
    formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      name: '',
      problem: '',
      solution: ''
    });
  }

  ngOnInit(): void { }

  public onSave(): void {
    const article: HowToArticleModel = this.form.value;
    let message: string;

    this.processing = true;
    this.howToArticlesService.create(article).pipe(
      finalize(() => {
        this.notificationService.displayMessage(message);
        this.processing = false;
      })
    ).subscribe({
      next: (_) => {
        message = 'The article was successfully saved!';
        this.dialogRef.close(true);
      },
      error: (_) => {
        message = 'Something went wrong. Please, try again later!';
      }
    });
  }
}
