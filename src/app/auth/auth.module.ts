import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';
import { FormsModule }      from '@angular/forms';

import { AuthComponent }        from './auth.component';
import { AuthSigninComponent }  from './auth-signin/auth-signin.component';
import { AuthSignupComponent }  from './auth-signup/auth-signup.component';

import { AuthRoutingModule }    from './auth-routing.module';

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      AuthRoutingModule
  ],
  declarations: [
      AuthComponent,
      AuthSigninComponent,
      AuthSignupComponent
  ],
  exports: [
      AuthComponent  
  ]
})
export class AuthModule { }
