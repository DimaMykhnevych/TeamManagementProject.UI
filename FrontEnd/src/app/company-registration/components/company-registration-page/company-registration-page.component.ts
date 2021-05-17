import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-registration-page',
  templateUrl: './company-registration-page.component.html',
  styleUrls: ['./company-registration-page.component.css'],
})
export class CompanyRegistrationPageComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private _builder: FormBuilder,
    private _router: Router,
    private _companyServise: CompanyService
  ) {
    this.form = this._builder.group({});
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this._builder.group({
      name: new FormControl('', Validators.required),
      domain: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      ceoEmail: new FormControl('', [
        Validators.required,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
      ]),
      ceoPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$_!%*?&])[A-Za-z\\d@$_!%*?&]{7,}$'
        ),
      ]),
      ceoUserName: new FormControl('', Validators.required),
    });
  }
  get name() {
    return this.form.get('name');
  }
  get domain() {
    return this.form.get('domain');
  }
  get address() {
    return this.form.get('address');
  }
  get ceoEmail() {
    return this.form.get('ceoEmail');
  }
  get phone() {
    return this.form.get('phone');
  }
  get ceoPassword() {
    return this.form.get('ceoPassword');
  }
  get ceoUserName() {
    return this.form.get('ceoUserName');
  }

  public onBackToHomeClick(): void {
    this._router.navigate(['']);
  }

  public onSubmit(): void {
    this._companyServise.addCompany(this.form.value).subscribe((resp) => {
      this._router.navigate(['/subscription-payment'], {
        queryParams: {
          companyId: resp.id,
        },
      });
    });
  }
}
