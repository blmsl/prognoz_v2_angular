import { Injectable }           from '@angular/core';
import { Observable }           from 'rxjs/Observable';

import { Comment }              from '../../shared/models/comment.model';
import { ErrorHandlerService }  from '../../shared/error-handler.service';
import { HeadersWithToken }     from '../../shared/headers-with-token.service';
import { environment }          from '../../../environments/environment';

@Injectable()

export class CommentService {

    constructor(
        private errorHandlerService: ErrorHandlerService,
        private headersWithToken: HeadersWithToken
    ) {}

    private commentUrl = environment.API_URL + 'comment';

    /**
     * Add comment to news
     * @param comment
     * @returns {Observable<Comment>}
     */
    createComment(comment: Comment): Observable<Comment> {
        return this.headersWithToken
            .post(this.commentUrl, comment)
            .map(response => response.json().comment)
            .catch(this.errorHandlerService.handle);
    }
}