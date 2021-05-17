import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Company } from 'src/app/models/Company';
import { Subscription } from 'src/app/models/Subscription';
import { SubscriptionPlan } from 'src/app/models/SubscriptionPlan';
import { environment } from 'src/environments/environment';
import { CompanyService } from '../../services/company.service';
import { SubscriptionPlanService } from '../../services/subscription-plan.service';
import { SubscriptionService } from '../../services/subscription.service';
import { StripePaymentRequest } from '../../../models/StripePaymentRequest';

@Component({
  selector: 'app-subscription-payment',
  templateUrl: './subscription-payment.component.html',
  styleUrls: ['./subscription-payment.component.css'],
})
export class SubscriptionPaymentComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public subscriptionPlans: SubscriptionPlan[];
  private _destroy$: Subject<void> = new Subject<void>();
  public selectedPlan: SubscriptionPlan;
  public expirationDate: Date;
  public companyId: string;
  public company: Company;
  public paymentResponse;

  takePaymentResult: string;
  constructor(
    private _router: Router,
    private _builder: FormBuilder,
    private _subscriptionPlanService: SubscriptionPlanService,
    private _activateRoute: ActivatedRoute,
    private _companyService: CompanyService,
    private _subscriptionService: SubscriptionService
  ) {
    this.form = this._builder.group({});
  }

  public ngOnInit(): void {
    this.initializeForm();
    this.subscribeOnFormValueChanges();
    this.getSubscriptionPlans();
    this.getCompany();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private getCompany(): void {
    this.companyId = this._activateRoute.snapshot.queryParams['companyId'];
    this._companyService
      .getCompany(this.companyId)
      .subscribe((resp: Company) => {
        this.company = resp;
      });
  }

  private getSubscriptionPlans(): void {
    this._subscriptionPlanService
      .getSubscriptionPlans()
      .subscribe((plans: SubscriptionPlan[]) => {
        this.subscriptionPlans = plans;
        this.onGetSubscriptionPlans();
      });
  }

  private onGetSubscriptionPlans(): void {
    this.form.get('subsctiptionPlan').setValue(this.subscriptionPlans[0].id);
    this.expirationDate = new Date();
    this.expirationDate.setDate(this.expirationDate.getDate() + 90);
  }

  private initializeForm(): void {
    this.form = this._builder.group({
      subsctiptionPlan: new FormControl('', Validators.required),
    });
  }

  private subscribeOnFormValueChanges(): void {
    this.form.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
      const selectedPlanId = this.form.controls.subsctiptionPlan.value;
      this.selectedPlan = this.subscriptionPlans.find(
        (p) => p.id === selectedPlanId
      );
      this.setExpirationDate();
    });
  }

  private setExpirationDate() {
    this.expirationDate = new Date();
    switch (this.selectedPlan.name) {
      case 'Premium':
        this.expirationDate.setDate(this.expirationDate.getDate() + 90);
        break;
      case 'Medium':
        this.expirationDate.setDate(this.expirationDate.getDate() + 60);
        break;
      case 'Standard':
        this.expirationDate.setDate(this.expirationDate.getDate() + 30);
        break;
      default:
        this.expirationDate.setDate(this.expirationDate.getDate() + 90);
        break;
    }
  }

  get subsctiptionPlan() {
    return this.form.get('subsctiptionPlan');
  }

  public onBackToHomeClick(): void {
    this._router.navigate(['']);
  }

  public onPayButtonClick(): void {
    this.openCheckout((token: any) => this.takePayment(token));
  }

  private takePayment(token: any) {
    let body: StripePaymentRequest = {
      tokenId: token.id,
      subscription: this.createSubscriptionModel(),
    };
    this._subscriptionService.updateSubscription(body).subscribe((resp) => {
      this.paymentResponse = resp;
    });
    this._router.navigate(['']);
  }

  private openCheckout(tokenCallback) {
    let handler = (<any>window).StripeCheckout.configure({
      key: environment.stripeKeys.publishableKey,
      locale: 'auto',
      token: tokenCallback,
    });

    let description = `${this.selectedPlan.name} Plan`;

    handler.open({
      name: 'Team Management',
      description: description,
      zipCode: false,
      currency: 'usd',
      amount: this.selectedPlan.price * 100,
      panelLabel: 'Pay {{amount}}',
      allowRememberMe: false,
    });
  }

  private createSubscriptionModel(): Subscription {
    let s: Subscription = {
      id: this.company.subscription.id,
      startDate: new Date(),
      expirationDate: this.expirationDate,
      transactionId: this.company.subscription.transactionId,
      transaction: {
        id: this.company.subscription.transactionId,
        publicKey: environment.stripeKeys.publishableKey,
        transactionDate: new Date(),
        subscription: null,
      },
      company: this.company,
      subscriptionPlanId: this.selectedPlan.id,
      subscriptionPlan: this.selectedPlan,
    };
    return s;
  }
}
