import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UserModel } from 'src/app/models/UserModel';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css'],
})
export class CreateTeamComponent implements OnInit {
  public form: FormGroup;
  public employees: UserModel[];
  public filteredOptions: Observable<string[]>;

  constructor(
    private _builder: FormBuilder,
    private _toastr: ToastrService,
    private _employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getEmployees();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.employees
      ?.filter(
        (option) => option.email.toLowerCase().indexOf(filterValue) === 0
      )
      .map((e) => e.email);
  }

  private initializeForm(): void {
    this.form = this._builder.group({
      teamName: new FormControl('', Validators.required),
      members: new FormControl('', Validators.required),
    });
  }

  private getEmployees(): void {
    this._employeeService.getEmployees().subscribe((resp) => {
      this.employees = resp;
      this.filteredOptions = this.members.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
    });
  }

  private getFilteredEmployees() {}

  get teamName() {
    return this.form.get('teamName');
  }

  get members() {
    return this.form.get('members');
  }

  public onSubmit(formDirective: FormGroupDirective): void {}
}
