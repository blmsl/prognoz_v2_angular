import { CommonModule }          from '@angular/common';
import { NgModule }              from '@angular/core';
import { ReactiveFormsModule }   from '@angular/forms';

import { AuthComponent }         from './auth.component';
import { AuthRecoveryComponent } from './auth-recovery/auth-recovery.component';
import { AuthResetComponent }    from './auth-reset/auth-reset.component';
import { AuthRoutingModule }     from './auth-routing.module';
import { AuthSigninComponent }   from './auth-signin/auth-signin.component';
import { AuthSignupComponent }   from './auth-signup/auth-signup.component';
import { DirectivesModule }      from '../shared/directives/directives.module';
import { RecaptchaModule }       from 'ng2-recaptcha';

@NgModule({
  imports: [
      CommonModule,
      AuthRoutingModule,
      ReactiveFormsModule,
      DirectivesModule,
      RecaptchaModule.forRoot()
  ],
  declarations: [
      AuthComponent,
      AuthRecoveryComponent,
      AuthResetComponent,
      AuthSigninComponent,
      AuthSignupComponent,
  ],
  exports: [
      AuthComponent  
  ]
})
export class AuthModule { }
