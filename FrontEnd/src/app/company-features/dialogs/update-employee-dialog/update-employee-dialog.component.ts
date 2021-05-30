import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserModel } from 'src/app/models/UserModel';

@Component({
  selector: 'app-update-employee-dialog',
  templateUrl: './update-employee-dialog.component.html',
  styleUrls: ['./update-employee-dialog.component.css'],
})
export class UpdateEmployeeDialogComponent implements OnInit {
  public employee: UserModel;
  public form: FormGroup;
  public isEmployeeAdding: boolean;
  constructor(
    public dialogRef: MatDialogRef<UpdateEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserModel,
    private _builder: FormBuilder
  ) {
    this.employee = data;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this._builder.group({
      firstName: new FormControl(this.employee.firstName, Validators.required),
      lastName: new FormControl(this.employee.lastName, Validators.required),
      email: new FormControl(this.employee.email, [
        Validators.required,
        Validators.email,
      ]),
      // password: new FormControl('', [Validators.required]),
      position: new FormControl(this.employee.position, Validators.required),
      dateOfBirth: new FormControl(
        this.employee.dateOfBirth,
        Validators.required
      ),
    });
  }

  public onSubmit(): void {
    this.dialogRef.close(this.form.value);
  }

  get firstName() {
    return this.form.get('firstName');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  get position() {
    return this.form.get('position');
  }
  get dateOfBirth() {
    return this.form.get('dateOfBirth');
  }
}
