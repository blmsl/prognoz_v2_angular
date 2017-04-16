import { NgModule }                   from '@angular/core';
import { BrowserModule }              from '@angular/platform-browser';
import { ReactiveFormsModule }        from '@angular/forms';
import { HttpModule }                 from '@angular/http';
import { BrowserAnimationsModule }    from '@angular/platform-browser/animations';
import { SimpleNotificationsModule }  from 'angular2-notifications';

import { AppRoutingModule }           from './app-routing.module';
import { AuthModule }                 from './auth/auth.module';
import { GuestbookModule }            from './guestbook/guestbook.module';
import { HomeModule }                 from './home/home.module';
import { ManageModule }               from './manage/manage.module';
import { NewsModule }                 from './news/news.module';
import { DirectivesModule }           from './shared/directives/directives.module';
import { MeModule }                   from './me/me.module';
import { ChampionshipModule }         from './championship/championship.module';

import { AccessDeniedComponent }      from './access-denied/access-denied.component';
import { AppComponent }               from './app.component';
import { FooterComponent }            from './footer/footer.component';
import { HeaderComponent }            from './header/header.component';
import { PageNotFoundComponent }      from './page-not-found/page-not-found.component';

import { HeadersWithToken }           from './shared/headers-with-token.service';
import { UserService }                from './shared/user.service';
import { ImageService }               from './shared/image.service';
import { HelperService }              from './shared/helper.service';
import { BroadcastService }           from './shared/broadcast.service';

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
        ImageService,
        HelperService,
        BroadcastService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }
