import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ErrorHandlerService {

    /**
     * Common method for handling all http errors
     * @param error
     * @returns {any}
     */
    handle(error: HttpErrorResponse | any) {
        let errorObject: any;
        const errorMessage: Array<any> = [];
        if (error instanceof HttpErrorResponse) {
            if (error.status !== 422) {
                const errorJson = JSON.parse(error.error);
                const err = errorJson.message || JSON.stringify(errorJson);
                errorMessage.push(`${error.status} - ${err}`);
            } else {
                errorObject = JSON.parse(error.error);
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