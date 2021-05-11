import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
// import * as ClassicEditor from '../../../node_modules/@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TagsService } from '../services/tags.service';
import { Tag } from '../models/Tag';
import { ArticlesService } from './../services/articles.service';
import { Article } from './../models/Article';
import { NotificationService } from './../services/notification.service';
import { finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { IArticleOperation } from './IArticleOperation';
import { environment } from 'src/environments/environment.js';
import { Router } from '@angular/router';
import { ArticleModel } from './../models/ArticleModel';
import { AppState } from '../services/app.state';
import { MatDialog } from '@angular/material/dialog';
import { TagCreationComponent } from '../tag-creation/tag-creation.component.js';

@Component({
  selector: 'app-article-creation',
  templateUrl: './article-creation.component.html',
  styleUrls: ['./article-creation.component.css'],
})
export class ArticleCreationComponent implements OnInit, IArticleOperation {
  public Editor = ClassicEditor;
  @ViewChild('select') select;
  public title = 'Add New Article';
  public tags: Array<Tag>;
  public saving = false;
  public config;
  articleForm: FormGroup;

  constructor(
    private tagsService: TagsService,
    private articleService: ArticlesService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private appstate: AppState,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.config = environment.ckeditorConfig;
    this.tagsService
      .getTags()
      .subscribe((tags: Array<Tag>) => (this.tags = tags));
    this.articleForm = this.formBuilder.group({
      name: new FormControl(''),
      tagId: new FormControl(''),
      content: new FormControl(''),
      status: new FormControl(''),
    });
  }

  save(form) {
    if (!form.valid) {
      return;
    }

    this.saving = true;
    const article: Article = this.articleForm.value;
    let message: string;

    this.articleService
      .create(article)
      .pipe(
        finalize(() => {
          this.saving = false;
          this.notificationService.displayMessage(message);
        })
      )
      .subscribe({
        next: (response: ArticleModel) => {
          message = 'The article was successfully saved!';
          this.router.navigateByUrl(`article/${response.id}`);
          this.appstate.articlesChanged.next(true);
        },
        error: (errors: HttpErrorResponse) => {
          if (errors.error.errors !== undefined) {
            message = Object.values(errors.error.errors).join(', ');
          } else {
            message = 'Internal server error. Please, try again later';
          }
        },
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(TagCreationComponent, {
      width: '70%',
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data !== '') {
        const option = document.createElement('option');
        option.value = data.id;
        option.innerHTML = data.label;
        option.selected = true;
        this.articleForm.patchValue({
          tagId: data.id,
        });
        this.select.nativeElement.appendChild(option);
      }
    });
  }
}
