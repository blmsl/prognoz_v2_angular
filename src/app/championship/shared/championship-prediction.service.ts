import { Injectable }                       from '@angular/core';
import { Http }                             from '@angular/http';
import { Observable }                       from 'rxjs/Observable';

import { ChampionshipPredict }              from '../../shared/models/championship-predict.model';
import { environment }                      from '../../../environments/environment';
import { ErrorHandlerService }              from '../../shared/error-handler.service';
import { HeadersWithToken }                 from '../../shared/headers-with-token.service';

@Injectable()

export class ChampionshipPredictionService {

    constructor(
        private errorHandlerService: ErrorHandlerService,
        private headersWithToken: HeadersWithToken,
        private http: Http
    ) {}

    private championshipPredictUrl = environment.apiUrl + 'championship/predicts';

    /**
     * Update predicts
     * @returns {Promise<ErrorObservable<T>|T>|any|Promise<ErrorObservable<T>>|Promise<R>}
     */
    update(value): Observable<any> {
        return this.headersWithToken
            .put(this.championshipPredictUrl, value)
            .map(response => response.json())
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Get user predicts by id
     * @param id
     * @param competitionId
     * @returns {Promise<ErrorObservable<T>|T>|Promise<R>|any|Promise<ErrorObservable<T>>}
     */
    user(id: number, competitionId: number = null): Observable<ChampionshipPredict[]> {
        let url = environment.apiUrl + 'championship/users/' + id;
        if (competitionId) url += '?competition_id=' + competitionId;
        return this.http.get(url)
            .map(response => response.json().championship_predicts || [])
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Get last predictions
     * @returns {Promise<ErrorObservable<T>>|any|Promise<ErrorObservable<T>|T>|Promise<R>}
     */
    get(): Observable<ChampionshipPredict[]> {
        let url = environment.apiUrl + 'championship/predictions';
        return this.http.get(url)
            .map(response => response.json().championship_predicts || [])
            .catch(this.errorHandlerService.handle);
    }
}