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
    handle(error: Response) {
        let errorObject: any;
        let errorMessage: Array<any> = [];
        if (error instanceof Response) {
            errorObject = error.json();
            if (errorObject.status_code !== 422) {
                errorMessage.push(errorObject.message);
            } else {
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