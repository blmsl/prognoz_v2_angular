import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule }    from './news-routing.module';

import { NewsDetailComponent }  from './news-detail/news-detail.component';
import { NewsListComponent }    from './news-list/news-list.component';
import { NewsService }          from './shared/news.service';

import { NewsComponent }        from './news.component';

@NgModule({
    imports: [
        CommonModule,
        NewsRoutingModule
    ],
    declarations: [
        NewsComponent,
        NewsDetailComponent,
        NewsListComponent,
    ],
    providers: [NewsService],
    exports: [
        NewsComponent,
        NewsDetailComponent,
        NewsListComponent,
    ]
})
export class NewsModule { }