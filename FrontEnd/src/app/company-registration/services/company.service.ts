import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../../models/Company';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private _http: HttpClient) {}

  public addCompany(company: Company): Observable<Company> {
    return this._http.post<Company>(
      environment.apiRoutes.companies.post,
      company
    );
  }
}
