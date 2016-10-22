import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { FormsModule }      from '@angular/forms';
import { HttpModule }       from '@angular/http';

import { AppComponent }     from './app.component';
import { HeadersWithToken}  from './shared/headers-with-token.service';
import { HomeModule }       from './home/home.module';
import { LoggedInGuard }    from './shared/logged-in-guard.service';
import { LoginComponent }   from './login/login.component';
import { NewsModule }       from './news/news.module';
import { UserService }      from './shared/user.service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NewsModule,
    HomeModule
  ],
  providers: [
      HeadersWithToken,
      LoggedInGuard,
      UserService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
