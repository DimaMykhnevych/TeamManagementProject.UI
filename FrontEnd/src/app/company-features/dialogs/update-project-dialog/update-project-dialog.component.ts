import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/app/models/Project';

@Component({
  selector: 'app-update-project-dialog',
  templateUrl: './update-project-dialog.component.html',
  styleUrls: ['./update-project-dialog.component.css'],
})
export class UpdateProjectDialogComponent implements OnInit {
  public form: FormGroup;
  public project: Project;
  public isProjectAdding: boolean;
  constructor(
    public dialogRef: MatDialogRef<UpdateProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project,
    private _builder: FormBuilder
  ) {
    this.project = data;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this._builder.group({
      name: new FormControl(this.project.name, Validators.required),
      startDate: new FormControl(this.project.startDate, Validators.required),
      endDate: new FormControl(this.project.endDate, [Validators.required]),
      projectDescription: new FormControl(this.project.projectDescription, [
        Validators.required,
      ]),
    });
  }

  public onSubmit() {
    this.dialogRef.close(this.form.value);
  }

  get name() {
    return this.form.get('name');
  }

  get startDate() {
    return this.form.get('startDate');
  }

  get endDate() {
    return this.form.get('endDate');
  }

  get projectDescription() {
    return this.form.get('projectDescription');
  }
}
