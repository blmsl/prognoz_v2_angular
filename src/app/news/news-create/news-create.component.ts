import { Component, OnInit } from '@angular/core';
import { Router }   from '@angular/router';

import { NewsService }  from '../shared/news.service';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.css']
})
export class NewsCreateComponent implements OnInit {
    test = 'news-create component works!';

    constructor(
        private newsService: NewsService,
        private router: Router
    ) {}

    ngOnInit() {
    }

    gotoNewsList() {
        this.router.navigate(['/news']);
    }

    create(title: string, body: string, image: string, tournament_id: number) {
        this.newsService.create(title, body, image, tournament_id).then(news => {
            this.gotoNewsList();
        });
    }


}
