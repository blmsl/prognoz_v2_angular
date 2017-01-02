import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { ReactiveFormsModule }  from '@angular/forms';

import { DirectivesModule }     from '../shared/directives/directives.module';
import { NewsComponent }        from './news.component';
import { NewsDetailComponent }  from './news-detail/news-detail.component';
import { NewsListComponent }    from './news-list/news-list.component';
import { NewsService }          from './shared/news.service';
import { NewsRoutingModule }    from './news-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NewsRoutingModule,
        DirectivesModule
    ],
    declarations: [
        NewsComponent,
        NewsDetailComponent,
        NewsListComponent
    ],
    providers: [
        NewsService
    ],
    exports: [
        NewsComponent
    ]
})
export class NewsModule { }