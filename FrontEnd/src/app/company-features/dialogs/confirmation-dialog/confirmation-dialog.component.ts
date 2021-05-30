import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogInfo } from 'src/app/models/DialogInfo';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
})
export class ConfirmationDialogComponent implements OnInit {
  public content: string;
  public title: string;
  constructor(@Inject(MAT_DIALOG_DATA) data: IDialogInfo) {
    this.content = data.content;
    this.title = data.title;
  }
  ngOnInit(): void {}
}
