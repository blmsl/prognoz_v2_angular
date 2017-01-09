import { NgModule }                   from '@angular/core';
import { BrowserModule }              from '@angular/platform-browser';
import { ReactiveFormsModule }        from '@angular/forms';
import { HttpModule }                 from '@angular/http';
import { SimpleNotificationsModule }  from 'angular2-notifications';

import { AppRoutingModule }           from './app-routing.module';
import { AuthModule }                 from './auth/auth.module';
import { GuestbookModule }            from './guestbook/guestbook.module';
import { HomeModule }                 from './home/home.module';
import { ManageModule }               from './manage/manage.module';
import { NewsModule }                 from './news/news.module';
import { DirectivesModule }           from './shared/directives/directives.module';
import { UserModule }                 from './user/user.module';
import { ChampionshipModule }         from './championship/championship.module';

import { AccessDeniedComponent }      from './access-denied/access-denied.component';
import { AppComponent }               from './app.component';
import { FooterComponent }            from './footer/footer.component';
import { HeaderComponent }            from './header/header.component';
import { PageNotFoundComponent }      from './page-not-found/page-not-found.component';

import { HeadersWithToken }           from './shared/headers-with-token.service';
import { LoggedInGuard }              from './shared/logged-in-guard.service';
import { UserService }                from './shared/user.service';
import { CommentService }             from './shared/comment.service';
import { ImageService }               from './shared/image.service';

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
        SimpleNotificationsModule,
        AppRoutingModule,
        AuthModule,
        ManageModule,
        ChampionshipModule,
        NewsModule,
        HomeModule,
        GuestbookModule,
        DirectivesModule,
        UserModule
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
