import { Injectable }       from '@angular/core';
import { Response }         from '@angular/http';
import { Observable }       from 'rxjs/Observable';

import { HeadersWithToken } from '../../shared/headers-with-token.service';
import { environment }      from '../../../environments/environment';

@Injectable()

export class CommentService {

    constructor(
        private headersWithToken: HeadersWithToken
    ) {}

    private commentUrl = environment.API_URL + 'comment';

    /**
     * Add comment to news
     *
     * @param comment
     * @returns {Observable<R>}
     */
    create(comment: {body: 'string', news_id: number, user_id: number}): Observable<any> {
        return this.headersWithToken
            .post(this.commentUrl, comment)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Transforms to json
     *
     * @param res
     * @returns {any}
     */
    private extractData(res: Response) {
        if (res && res.status !== 204) {
            let body = res.json();
            return body || {};
        }
    
        return res;
    }

    /**
     * Error handling
     *
     * @param error
     * @returns {ErrorObservable}
     */
    private handleError(error: Response | any) {
        let errorObject: any;
        let errorMessage: Array<any> = [];
        if (error instanceof Response) {
            errorObject = error.json();
            if (errorObject.status_code !== 422) {
                errorMessage.push(errorObject.message);
            } else {
                if (errorObject.errors.body) errorMessage.push(errorObject.errors.body);
                if (errorObject.errors.user_id) errorMessage.push(errorObject.errors.user_id);
                if (errorObject.errors.news_id) errorMessage.push(errorObject.errors.news_id);
            }
        } else {
            errorMessage.push('Невідома помилка');
        }
    
        return Observable.throw(errorMessage);
    }
}