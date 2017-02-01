import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { Router }                                    from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {

    @Input() totalItems: number;
    @Input() currentPage: number;
    @Input() pageSize: number;
    @Input() path: string;

    pager = {};

    constructor(
        private router: Router
    ) {}

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        if (this.totalItems) {
            this.pager = this.getPage(this.totalItems, this.currentPage, this.pageSize);
        }
    }
    
    private getPage(totalItems: number, current: number, perPage: number) {
        let currentPage = current || 1;
        let pageSize = perPage || 10;
        let totalPages = Math.ceil(totalItems / pageSize);
        let startPage, endPage;

        if (totalPages <= 10) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        let pages = [];
        for (let i = startPage; i < endPage + 1; i++) {
            pages.push(i);
        }

        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        }
    }
}
