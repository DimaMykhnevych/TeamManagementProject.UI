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
import { Team } from 'src/app/models/Team';
import { UserModel } from 'src/app/models/UserModel';
import { EmployeeService } from '../../services/employee.service';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css'],
})
export class CreateTeamComponent implements OnInit {
  public form: FormGroup;
  public employees: UserModel[];
  public filteredOptions: Observable<string[]>;
  public selectedEmplyees: UserModel[] = [];
  public isTeamAdding: boolean;

  constructor(
    private _builder: FormBuilder,
    private _toastr: ToastrService,
    private _employeeService: EmployeeService,
    private _teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getEmployees();
  }

  private _filter(value: string): string[] {
    const filterValue = value?.toLowerCase();
    return this.employees
      ?.filter(
        (option) => option.email.toLowerCase().indexOf(filterValue) === 0
      )
      .map((e) => e.email);
  }

  private initializeForm(): void {
    this.form = this._builder.group({
      teamName: new FormControl('', Validators.required),
      members: new FormControl(''),
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

  public mySelectHandler(option: string): void {
    const empl = this.employees.find((e) => e.email === option);
    const idx = this.employees.indexOf(empl);
    this.employees.splice(idx, 1);
    this.selectedEmplyees.push(empl);
    this.members.setValue('');
  }

  public onDeleteBtnClick(employee: UserModel): void {
    this.employees.push(employee);
    const idx = this.selectedEmplyees.indexOf(employee);
    this.selectedEmplyees.splice(idx, 1);
  }

  get teamName() {
    return this.form.get('teamName');
  }

  get members() {
    return this.form.get('members');
  }

  public onSubmit(formDirective: FormGroupDirective): void {
    this.isTeamAdding = true;
    const team: Team = {
      id: '',
      teamName: this.teamName.value,
      members: this.selectedEmplyees,
      companyId: '283bedee-89ed-45e5-8f22-d6f5f5ec62d0',
      company: null,
      teamProjects: [],
      polls: [],
    };
    this._teamService.createTeam(team).subscribe((resp) => {
      if (resp) {
        this.isTeamAdding = false;
        this._toastr.success('Team was created successfully!');
        this.clearFields(formDirective);
        this.selectedEmplyees = [];
      }
    });
  }

  private clearFields(formDirective: FormGroupDirective): void {
    formDirective.resetForm();
    this.form.reset();
  }
}
