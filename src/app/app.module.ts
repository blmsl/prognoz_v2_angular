import { NgModule }                   from '@angular/core';
import { HttpModule }                 from '@angular/http';
import { ReactiveFormsModule }        from '@angular/forms';
import { BrowserModule }              from '@angular/platform-browser';
import { BrowserAnimationsModule }    from '@angular/platform-browser/animations';

import { AccessDeniedComponent }      from './access-denied/access-denied.component';
import { AppComponent }               from './app.component';
import { AppRoutingModule }           from './app-routing.module';
import { AuthModule }                 from './auth/auth.module';
import { AuthService }                from './shared/auth.service';
import { BroadcastService }           from './shared/broadcast.service';
import { ChampionshipModule }         from './championship/championship.module';
import { CurrentStateService }        from './shared/current-state.service';
import { DirectivesModule }           from './shared/directives/directives.module';
import { ErrorHandlerService }        from './shared/error-handler.service';
import { FooterComponent }            from './footer/footer.component';
import { GuestbookModule }            from './guestbook/guestbook.module';
import { HeaderComponent }            from './header/header.component';
import { HeadersWithToken }           from './shared/headers-with-token.service';
import { HelperService }              from './shared/helper.service';
import { HomeModule }                 from './home/home.module';
import { ImageService }               from './shared/image.service';
import { ManageModule }               from './manage/manage.module';
import { MeModule }                   from './me/me.module';
import { NewsModule }                 from './news/news.module';
import { PageNotFoundComponent }      from './page-not-found/page-not-found.component';
import { SimpleNotificationsModule }  from 'angular2-notifications';
import { UserService }                from './shared/user.service';

@NgModule({
    declarations: [
        AccessDeniedComponent,
        AppComponent,
        FooterComponent,
        HeaderComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
        BrowserAnimationsModule,
        SimpleNotificationsModule.forRoot(),
        AppRoutingModule,
        AuthModule,
        ManageModule,
        ChampionshipModule,
        GuestbookModule,
        HomeModule,
        DirectivesModule,
        MeModule,
        NewsModule
    ],
    providers: [
        HeadersWithToken,
        UserService,
        AuthService,
        CurrentStateService,
        ImageService,
        HelperService,
        BroadcastService,
        ErrorHandlerService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }
