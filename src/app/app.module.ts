import { NgModule }                   from '@angular/core';
import { HttpModule }                 from '@angular/http';
import { BrowserModule }              from '@angular/platform-browser';
import { BrowserAnimationsModule }    from '@angular/platform-browser/animations';

import { AppComponent }               from './app.component';
import { AppRoutingModule }           from './app-routing.module';
import { AuthModule }                 from './auth/auth.module';
import { ChampionshipModule }         from './championship/championship.module';
import { CoreModule }                 from './core/core.module';
import { GuestbookModule }            from './guestbook/guestbook.module';
import { HomeModule }                 from './home/home.module';
import { ManageModule }               from './manage/manage.module';
import { MeModule }                   from './me/me.module';
import { NewsModule }                 from './news/news.module';
import { SharedModule }               from './shared/shared.module';
import { SimpleNotificationsModule }  from 'angular2-notifications';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        AuthModule,
        BrowserAnimationsModule,
        BrowserModule,
        ChampionshipModule,
        CoreModule,
        GuestbookModule,
        HomeModule,
        HttpModule,
        ManageModule,
        MeModule,
        NewsModule,
        SimpleNotificationsModule.forRoot(),
        SharedModule
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }
