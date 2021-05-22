import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-creation',
  templateUrl: './project-creation.component.html',
  styleUrls: ['./project-creation.component.css'],
})
export class ProjectCreationComponent implements OnInit {
  public form: FormGroup;
  public isProjectAdding: boolean;
  constructor(
    private _builder: FormBuilder,
    private _toastr: ToastrService,
    private _projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this._builder.group({
      name: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', [Validators.required]),
      projectDescription: new FormControl('', [Validators.required]),
    });
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

  public onSubmit(formDirective: FormGroupDirective): void {
    this.startDate.setValue(
      this.convertDateToRightFormat(new Date(this.startDate.value))
    );
    this.endDate.setValue(
      this.convertDateToRightFormat(new Date(this.endDate.value))
    );
    this.isProjectAdding = true;

    this._projectService.createProject(this.form.value).subscribe((resp) => {
      if (resp) {
        this.isProjectAdding = false;
        this._toastr.success('Project was added successfully');
        this.clearFields(formDirective);
      }
    });
  }

  private clearFields(formDirective: FormGroupDirective): void {
    formDirective.resetForm();
    this.form.reset();
  }

  private convertDateToRightFormat(date: Date): Date {
    if (typeof date === 'string') {
      return date;
    }
    let utcDate = new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes()
      )
    );
    return utcDate;
  }
}
