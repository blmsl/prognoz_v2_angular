import { Injectable } from '@angular/core';
import { Response }   from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ErrorHandlerService {

    /**
     * Common method for handling all http errors
     * @param error
     * @returns {any}
     */
    handle(error: Response | any) {
        let errorObject: any;
        let errorMessage: Array<any> = [];
        if (error instanceof Response) {
            if (error.status !== 422) {
                const body = error.json() || '';
                const err = body.message || JSON.stringify(body);
                errorMessage.push(`${error.status} - ${err}`);
            } else {
                errorObject = error.json();
                Object.keys(errorObject.errors).forEach(function(key) {
                    errorMessage.push(errorObject.errors[key]);
                });
            }
        } else {
            errorMessage.push('Невідома помилка');
        }
        return Observable.throw(errorMessage);
    }

}