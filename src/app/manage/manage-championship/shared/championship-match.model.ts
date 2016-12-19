export class ChampionshipMatch {
    id: number;
    t1_id: number;
    t2_id: number;
    r1: number | null;
    r2: number | null;
    starts_at: string;
    predicts: number | null;
    points: number | null;
    dc: number | null;
    active: boolean | null;
    ended: boolean | null;
}