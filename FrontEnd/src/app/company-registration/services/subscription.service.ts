import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StripePaymentRequest } from 'src/app/models/StripePaymentRequest';
import { Subscription } from 'src/app/models/Subscription';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  constructor(private _http: HttpClient) {}

  public updateSubscription(
    paymentRequest: StripePaymentRequest
  ): Observable<any> {
    return this._http.put<StripePaymentRequest>(
      `${environment.apiRoutes.subscription.put}/${paymentRequest.subscription.id}`,
      paymentRequest,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
