import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {

    constructor() { }

    /**
     * check if score is present
     *
     * @param home
     * @param away
     * @returns {boolean}
     */
    isScore(home: number, away: number) {
        if ((home != null) && (away != null)) {
            return true;
        }
        return false;
    }

    /**
     * return user points of the match
     *
     * @param resultHome
     * @param resultAway
     * @param predictHome
     * @param predictAway
     * @returns {number}
     */
    getUserPointsOnMatch(resultHome: number, resultAway:number , predictHome:number , predictAway:number) {
        let points = 0;
        switch (true) {
            // home team wins
            case resultHome > resultAway:
                if (predictHome > predictAway) {
                    switch (true) {
                        // full guessed (3 points)
                        case ((resultHome === predictHome) && (resultAway === predictAway)):
                            points = 3;
                            break;
                        // guessed goal difference
                        case ((resultHome - predictHome) === (resultAway - predictAway)):
                            points = 2;
                            break;
                        // guessed match winner
                        default:
                            points = 1;
                            break;
                    }
                }
                break;
            // away team wins
            case resultHome < resultAway:
                if (predictHome < predictAway) {
                    switch (true) {
                        // full guessed (3 points)
                        case ((resultHome === predictHome) && (resultAway === predictAway)):
                            points = 3;
                            break;
                            // guessed goal difference
                        case ((resultHome - predictHome) === (resultAway - predictAway)):
                            points = 2;
                            break;
                            // guessed match winner
                        default:
                            points = 1;
                            break;
                    }
                }
                break;
            case resultHome === resultAway:
                if (predictHome === predictAway) {
                    switch (true) {
                        // full guessed (3 points)
                        case ((resultHome === predictHome) && (resultAway === predictAway)):
                            points = 3;
                            break;
                        // guessed goal difference
                        case ((resultHome - predictHome) === (resultAway - predictAway)):
                            points = 2;
                            break;
                    }
                }
                break;
        }
        return points;
    }

    /**
     * return hometown or nothing
     *
     * @param hometown
     * @returns {string}
     */
    getHometown(hometown: string | null) {
        return hometown ? '(' + hometown + ')' : '';
    }

    /**
     * returns unsiged number
     *
     * @param moving
     * @returns {number}
     */
    makeUnsigned(moving: number) {
        return Math.abs(moving);
    }
}
