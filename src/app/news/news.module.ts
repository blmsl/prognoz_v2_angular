import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';

import { NewsComponent }        from './news.component';
import { NewsCreateComponent }  from './news-create/news-create.component';
import { NewsDetailComponent }  from './news-detail/news-detail.component';
import { NewsListComponent }    from './news-list/news-list.component';
import { NewsService }          from './shared/news.service';

import { NewsRoutingModule }    from './news-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NewsRoutingModule
    ],
    declarations: [
        NewsComponent,
        NewsCreateComponent,
        NewsDetailComponent,
        NewsListComponent
    ],
    providers: [NewsService],
    exports: [
        NewsComponent
    ]
})
export class NewsModule { }