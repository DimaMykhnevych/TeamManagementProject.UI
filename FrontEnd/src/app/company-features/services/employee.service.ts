import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/UserModel';
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
      employee,
      { withCredentials: true }
    );
  }

  public getEmployees(): Observable<UserModel[]> {
    return this._http.get<UserModel[]>(environment.apiRoutes.employee.get, {
      withCredentials: true,
    });
  }

  public getAllEmployees(): Observable<UserModel[]> {
    return this._http.get<UserModel[]>(
      environment.apiRoutes.employee.allEmployees,
      {
        withCredentials: true,
      }
    );
  }

  public updateEmployee(employee: UserModel): Observable<UserModel> {
    return this._http.put<UserModel>(
      environment.apiRoutes.employee.update,
      employee,
      { withCredentials: true }
    );
  }

  public deleteEmployee(id: string): Observable<boolean> {
    return this._http.delete<boolean>(
      `${environment.apiRoutes.employee.delete}/${id}`,
      { withCredentials: true }
    );
  }
}
