import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RegisterEmployeeModel } from 'src/app/models/RegisterEmployeeModel';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css'],
})
export class RegisterEmployeeComponent implements OnInit {
  public form: FormGroup;
  public isEmployeeAdding: boolean;
  constructor(
    private _builder: FormBuilder,
    private _toastr: ToastrService,
    private _employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this._builder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      position: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
    });
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

  public onSubmit(formDirective: FormGroupDirective): void {
    this.isEmployeeAdding = true;
    this._employeeService
      .registerEmployee(this.form.value)
      .subscribe((resp: RegisterEmployeeModel) => {
        if (resp) {
          this.isEmployeeAdding = false;
          this._toastr.success('Employee was added successfully');
          this.clearFields(formDirective);
        }
      });
  }

  private clearFields(formDirective: FormGroupDirective): void {
    formDirective.resetForm();
    this.form.reset();
  }
}
