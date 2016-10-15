import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { FormsModule }      from '@angular/forms';
import { HttpModule }       from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { NewsModule }       from './news/news.module';
import { HomeModule }       from './home/home.module';

import { AppComponent }     from './app.component';
//import { HomeComponent }    from './home/home.component';
//import { NewsComponent }    from './news/news.component';
//import { NewsService }      from './news/news.service';

@NgModule({
  declarations: [
    AppComponent
    //HomeComponent
    //NewsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NewsModule,
    HomeModule
  ],
  //providers: [ NewsService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
