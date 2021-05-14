import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-company-registration-page',
  templateUrl: './company-registration-page.component.html',
  styleUrls: ['./company-registration-page.component.css'],
})
export class CompanyRegistrationPageComponent implements OnInit {
  public form: FormGroup;

  constructor(private _builder: FormBuilder) {
    this.form = this._builder.group({});
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this._builder.group({
      companyName: new FormControl('', Validators.required),
      domain: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$_!%*?&])[A-Za-z\\d@$_!%*?&]{7,}$'
        ),
      ]),
    });
  }
  get companyName() {
    return this.form.get('companyName');
  }
  get domain() {
    return this.form.get('domain');
  }
  get address() {
    return this.form.get('address');
  }
  get email() {
    return this.form.get('email');
  }
  get phone() {
    return this.form.get('phone');
  }
  get password() {
    return this.form.get('password');
  }
}
