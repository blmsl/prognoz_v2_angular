export class ChampionshipMatch {
    id: number;
    competition_id: number;
    t1_id: number;
    t2_id: number;
    home: number | null;
    away: number | null;
    starts_at: string;
    predicts: number | null;
    points: number | null;
    dc: number | null;
    active: boolean | null;
    ended: boolean | null;
    championship_predicts: Array<any>;
    club_first: any;
    club_second: any;
}