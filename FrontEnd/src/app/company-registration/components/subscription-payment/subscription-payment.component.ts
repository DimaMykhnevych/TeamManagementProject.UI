import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscription-payment',
  templateUrl: './subscription-payment.component.html',
  styleUrls: ['./subscription-payment.component.css'],
})
export class SubscriptionPaymentComponent implements OnInit {
  public form: FormGroup;
  constructor(private _router: Router, private _builder: FormBuilder) {
    this.form = this._builder.group({});
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this._builder.group({});
  }

  public onBackToHomeClick(): void {
    this._router.navigate(['']);
  }

  public onSubmit(): void {}
}
