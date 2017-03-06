import { Component, OnInit }    from '@angular/core';

import { NewsService }          from '../news/shared/news.service';
import { News }                 from '../news/shared/news.model';
import { environment }          from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    constructor(
        private newsService: NewsService
    ) { }

    error: string | Array<string>;
    news: News[];
    spinner: boolean = false;
    newsImagesUrl: string = environment.API_IMAGE_NEWS;

    ngOnInit() {
        this.spinner = true;
        this.newsService.getNews().subscribe(
            result => {
                if (!result.data) {
                    this.error = "В базі даних новин немає";
                } else {
                    this.news = result.data;
                }
                this.spinner = false;
            },
            error => {
                this.error = error;
                this.spinner = false;
            }
        );
    }
}
