import { NgModule }                   from '@angular/core';
import { BrowserModule }              from '@angular/platform-browser';
import { FormsModule }                from '@angular/forms';
import { HttpModule }                 from '@angular/http';
import { SimpleNotificationsModule }  from 'angular2-notifications';

import { AppRoutingModule }           from './app-routing.module';
import { AuthModule }                 from './auth/auth.module';
import { GuestbookModule }            from './guestbook/guestbook.module';
import { HomeModule }                 from './home/home.module';
import { ManageModule }               from './manage/manage.module';
import { NewsModule }                 from './news/news.module';

import { AppComponent }               from './app.component';
import { FooterComponent }            from './footer/footer.component';
import { HeaderComponent }            from './header/header.component';

import { HeadersWithToken }           from './shared/headers-with-token.service';
import { LoggedInGuard }              from './shared/logged-in-guard.service';
import { UserService }                from './shared/user.service';
import { CommentService }             from './shared/comment.service';
import { ImageService }               from './shared/image.service';

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        SimpleNotificationsModule,
        AppRoutingModule,
        AuthModule,
        ManageModule,
        NewsModule,
        HomeModule,
        GuestbookModule
    ],
    providers: [
        HeadersWithToken,
        LoggedInGuard,
        UserService,
        CommentService,
        ImageService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }
