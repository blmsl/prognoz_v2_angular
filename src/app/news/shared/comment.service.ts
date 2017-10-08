import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Comment } from '../../shared/models/comment.model';
import { environment } from '../../../environments/environment';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { HeadersWithToken } from '../../core/headers-with-token.service';

@Injectable()

export class CommentService {

    constructor(
        private errorHandlerService: ErrorHandlerService,
        private headersWithToken: HeadersWithToken
    ) {}

    private commentUrl = environment.apiUrl + 'comment';

    /**
     * Add comment to news
     * @param comment
     * @returns {Observable<Comment>}
     */
    createComment(comment: Comment): Observable<Comment> {
        return this.headersWithToken
            .post(this.commentUrl, comment)
            .map(response => response['comment'])
            .catch(this.errorHandlerService.handle);
    }
}