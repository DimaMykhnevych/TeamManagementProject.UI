import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscription-payment',
  templateUrl: './subscription-payment.component.html',
  styleUrls: ['./subscription-payment.component.css'],
})
export class SubscriptionPaymentComponent implements OnInit {
  public form: FormGroup;
  takePaymentResult: string;
  constructor(
    private _router: Router,
    private _builder: FormBuilder,
    private _http: HttpClient
  ) {
    this.form = this._builder.group({});
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  takePayment(productName: string, amount: number, token: any) {
    let body = {
      tokenId: token.id,
      productName: productName,
      amount: amount,
    };
    let bodyString = JSON.stringify(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });

    // this._http
    //   .post("/api/stripepayment", bodyString, options)
    //   .toPromise()
    //   .then(res => {
    //     this.takePaymentResult = res.json().status;
    //   })
    //   .catch(error => {
    //     this.takePaymentResult = error.message;
    //   });
  }

  openCheckout(productName: string, amount: number, tokenCallback) {
    let handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51Irp6yF27ICkRRw9XrC5XUCd43fCvV4YGyhyg1nEnYjY3dr8Iegpjo0o0dviTYptZ4Unoaaek4X3vCnNFTmtZtGa00GmwLCiKT',
      locale: 'auto',
      token: tokenCallback,
    });

    handler.open({
      name: 'Our Shop',
      description: productName,
      zipCode: false,
      currency: 'gbp',
      amount: amount,
      panelLabel: 'Pay {{amount}}',
      allowRememberMe: false,
    });
  }

  buyTShirt() {
    this.openCheckout('T-Shirt', 1000, (token: any) =>
      this.takePayment('T-Shirt', 1000, token)
    );
  }
  buyTrainers() {
    this.openCheckout('Trainers', 1500, (token: any) =>
      this.takePayment('Trainers', 1500, token)
    );
  }
  buyJeans() {
    this.openCheckout('Jeans', 2000, (token: any) =>
      this.takePayment('Jeans', 2000, token)
    );
  }

  private initializeForm(): void {
    this.form = this._builder.group({
      name: new FormControl('', [Validators.required]),
    });
  }

  public onBackToHomeClick(): void {
    this._router.navigate(['']);
  }

  public onSubmit(): void {}
}
