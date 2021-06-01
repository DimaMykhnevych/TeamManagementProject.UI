import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RegisterEmployeeModel } from 'src/app/models/RegisterEmployeeModel';
import { NotificationService } from 'src/app/services/notification.service';
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
    private _employeeService: EmployeeService,
    private _notificationService: NotificationService
  ) {}

  public ngOnInit(): void {
    this.initializeForm();
  }

  public get firstName(): AbstractControl {
    return this.form.get('firstName');
  }
  public get lastName(): AbstractControl {
    return this.form.get('lastName');
  }
  public get email(): AbstractControl {
    return this.form.get('email');
  }
  public get password(): AbstractControl {
    return this.form.get('password');
  }
  public get position(): AbstractControl {
    return this.form.get('position');
  }
  public get dateOfBirth(): AbstractControl {
    return this.form.get('dateOfBirth');
  }

  public onSubmit(formDirective: FormGroupDirective): void {
    this.isEmployeeAdding = true;
    this._employeeService.registerEmployee(this.form.value).subscribe(
      (resp: RegisterEmployeeModel) => {
        if (resp) {
          this.isEmployeeAdding = false;
          this._toastr.success('Employee was added successfully');
          this.clearFields(formDirective);
        }
      },
      (err) => {
        this.isEmployeeAdding = false;
        this._notificationService
          .displayMessage(`Password must contain minimum seven characters, at least one
        uppercase letter, one lowercase letter, one number and one
        special character`);
      }
    );
  }

  private clearFields(formDirective: FormGroupDirective): void {
    formDirective.resetForm();
    this.form.reset();
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
}
