import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { FormsModule }          from '@angular/forms';
import { ReactiveFormsModule }  from '@angular/forms';

import { AuthComponent }        from './auth.component';
import { AuthSigninComponent }  from './auth-signin/auth-signin.component';
import { AuthSignupComponent }  from './auth-signup/auth-signup.component';
import { AuthSignupService }  from './auth-signup/auth-signup.service';

import { AuthRoutingModule }    from './auth-routing.module';

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      AuthRoutingModule,
      ReactiveFormsModule
  ],
  declarations: [
      AuthComponent,
      AuthSigninComponent,
      AuthSignupComponent
  ],
  exports: [
      AuthComponent  
  ],
  providers: [
      AuthSignupService
  ]
})
export class AuthModule { }
