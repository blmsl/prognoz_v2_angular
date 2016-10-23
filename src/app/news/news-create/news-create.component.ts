import { Component, OnInit } from '@angular/core';
import { Router }   from '@angular/router';

import { NewsService }  from '../shared/news.service';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.css']
})
export class NewsCreateComponent implements OnInit {

    constructor(
        private newsService: NewsService,
        private router: Router
    ) {}

    test = 'news-create component works!';
    errorMessage: string;

    ngOnInit() {
    }

    gotoNewsList() {
        this.router.navigate(['/news']);
    }

    create(title: string, body: string, image: string, tournament_id: number) {
        this.newsService.create(title, body, image, tournament_id)
            .subscribe(
                news => this.gotoNewsList(),
                error => this.errorMessage = <any>error
            );
    }


}
