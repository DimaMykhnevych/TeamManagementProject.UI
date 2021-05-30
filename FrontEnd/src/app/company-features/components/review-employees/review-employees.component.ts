import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';
import { UserModel } from 'src/app/models/UserModel';
import { DialogService } from '../../services/dialog.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-review-employees',
  templateUrl: './review-employees.component.html',
  styleUrls: ['./review-employees.component.css'],
})
export class ReviewEmployeesComponent implements OnInit {
  public employees: UserModel[] = [];
  constructor(
    private _employeeService: EmployeeService,
    private _dialogService: DialogService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getEmployees().subscribe((resp) => {
      this.employees = resp;
    });
  }

  private getEmployees(): Observable<UserModel[]> {
    return this._employeeService.getAllEmployees();
  }

  public onEditButtonClick(id: string): void {
    const employee = this.employees.find((e) => e.id === id);
    this._dialogService
      .openJourneyDetailsDialog(employee)
      .afterClosed()
      .pipe(
        switchMap((updatedEmployee) => {
          updatedEmployee.id = id;
          return this.updateEmployee(updatedEmployee);
        })
      )
      .subscribe((resp) => {
        this.employees = resp;
        this._toastr.success('Employee was updated successfully');
      });
  }

  public updateEmployee(employee: UserModel): Observable<UserModel[]> {
    return this._employeeService.updateEmployee(employee).pipe(
      switchMap(() => {
        return this.getEmployees();
      })
    );
  }
}
