import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterEmployeeModel } from '../../models/RegisterEmployeeModel';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private _http: HttpClient) {}

  public registerEmployee(
    employee: RegisterEmployeeModel
  ): Observable<RegisterEmployeeModel> {
    return this._http.post<RegisterEmployeeModel>(
      environment.apiRoutes.employee.post,
      employee
    );
  }
}
