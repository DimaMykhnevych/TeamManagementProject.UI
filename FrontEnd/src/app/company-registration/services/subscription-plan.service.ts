import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SubscriptionPlan } from 'src/app/models/SubscriptionPlan';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionPlanService {
  constructor(private _http: HttpClient) {}

  public getSubscriptionPlans(): Observable<SubscriptionPlan[]> {
    return this._http.get<SubscriptionPlan[]>(
      environment.apiRoutes.subscriptionPlans.get
    );
  }
}
