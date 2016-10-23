import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';

import { News }         from '../shared/news.model';
import { NewsService }  from '../shared/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})

export class NewsListComponent implements OnInit {

    constructor(
        private router: Router,
        private newsService: NewsService
    ) { }

    title = 'news-list component works!';
    news: News[];
    errorMessage: string;

    ngOnInit() {
        this.newsService.getNews().subscribe(news => this.news = news);
    }
    
    onSelect(news: News) {
        this.router.navigate(['/news', news.id]);
    }

    delete(news: News) {
        this.newsService.delete(news.id)
            .subscribe(
                () => {
                    this.news = this.news.filter(n => n !== news);
                },
                error => this.errorMessage = <any>error
            );
    }
}
