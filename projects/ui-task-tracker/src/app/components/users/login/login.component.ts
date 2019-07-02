import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { StateSettings } from '../../../stores/reducers/settings.reducer';
import { LoginUser } from '../../../stores/actions/users.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginFormControl: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store$: Store<StateSettings>
    ) {
  }

  ngOnInit(): void {
    this.loginFormControl = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.store$.dispatch(new LoginUser(this.loginFormControl.value));
  }

}
