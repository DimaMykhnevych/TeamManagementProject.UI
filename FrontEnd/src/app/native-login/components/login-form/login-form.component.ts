import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthForm } from '../../../models/LoginFormModel';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  @Output()
  public submit: EventEmitter<AuthForm> = new EventEmitter<AuthForm>();
  @Input() public set isLoginUnSuccessfull(j: boolean) {
    this._isLoginUnSuccessfull = j;
  }
  public get isLoginUnSuccessfull(): boolean {
    return this._isLoginUnSuccessfull;
  }

  public form: FormGroup;
  public submitted: boolean = false;
  private _isLoginUnSuccessfull: boolean;

  constructor(private _builder: FormBuilder) {
    this.form = this._builder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public ngOnInit(): void {}

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  public onSubmit(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.submit.emit(this.form.value);
  }
}
