import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
// import * as ClassicEditor from '../../../node_modules/@ckeditor/ckeditor5-custom/build/ckeditor.js';
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
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.js';
import { AppState } from '../services/app.state';
import { TagCreationComponent } from '../tag-creation/tag-creation.component.js';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-creation.component.html',
  styleUrls: ['./article-creation.component.css'],
})
export class ArticleEditComponent implements OnInit, IArticleOperation {
  public Editor = ClassicEditor;
  @ViewChild('select') select;
  public title = 'Edit Article';
  public tags: Array<Tag>;
  public id: string;
  public saving = false;
  public config;
  articleForm: FormGroup;

  constructor(
    private tagsService: TagsService,
    private articlesService: ArticlesService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private appstate: AppState,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.config = environment.ckeditorConfig;
    this.tagsService
      .getTags()
      .subscribe((tags: Array<Tag>) => (this.tags = tags));
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      this.articlesService.getById(id).subscribe({
        next: (article) => {
          if (!article.isMadeByUser) {
            this.router.navigateByUrl('home');
          }

          this.id = id;
          this.articleForm = this.formBuilder.group({
            name: new FormControl(article.name),
            tagId: new FormControl(article.tagId),
            content: new FormControl(article.content),
            status: new FormControl(article.status),
          });
        },
        error: (_) => {
          this.router.navigateByUrl('home');
        },
      });
    });
  }

  save(form) {
    if (!form.valid) {
      return;
    }

    this.saving = true;
    const article: Article = this.articleForm.value;
    let message: string;

    this.articlesService
      .edit(article, this.id)
      .pipe(
        finalize(() => {
          this.saving = false;
          this.notificationService.displayMessage(message);
        })
      )
      .subscribe({
        next: (_) => {
          message = 'The article was successfully saved!';
          this.router.navigateByUrl(`article/${this.id}`);
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
