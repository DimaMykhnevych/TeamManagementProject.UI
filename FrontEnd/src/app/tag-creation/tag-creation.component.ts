import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../services/notification.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TagsService } from './../services/tags.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-tag-creation',
  templateUrl: './tag-creation.component.html',
  styleUrls: ['./tag-creation.component.css']
})
export class TagCreationComponent {
  public readonly form: FormGroup;
  public processing = false;

  constructor(
    private dialogRef: MatDialogRef<TagCreationComponent>,
    private tagsService: TagsService,
    private notificationService: NotificationService,
    formBuilder: FormBuilder
  ){
    this.form = formBuilder.group({
      label: new FormControl('')
    });
   }

  onSave() {
    const tagLabel: string = this.form.value.label;
    let message: string;
    this.processing = true;

    this.tagsService.create(tagLabel).pipe(
      finalize(() => {
        this.notificationService.displayMessage(message);
        this.processing = false;
      })
    ).subscribe({
      next: (tag) => {
        message = 'The tag was successfully saved!';
        this.dialogRef.close(tag);
      },
      error: (errors) => {
        console.log(errors);
        if (errors.error.errors !== undefined ){
          message = Object.values(errors.error).join(', ');
        }
        else {
          message = 'Internal server error. Please, try again later';
        }
      }
    });
  }
}
