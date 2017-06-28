import { Injectable }           from '@angular/core';
import { Observable }           from 'rxjs/Observable';

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
     * @returns {Observable<any>}
     */
    create(comment: {body: 'string', news_id: number, user_id: number}): Observable<any> {
        return this.headersWithToken
            .post(this.commentUrl, comment)
            .map(response => response.json())
            .catch(this.errorHandlerService.handle);
    }
}