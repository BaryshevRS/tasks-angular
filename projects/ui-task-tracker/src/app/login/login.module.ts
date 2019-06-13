import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCheckboxModule, MatInputModule } from '@angular/material';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatInputModule,
    MatButtonModule,
  ],
  declarations: [LoginComponent],
  exports: [
    LoginComponent
  ]
})
export class LoginModule {}
