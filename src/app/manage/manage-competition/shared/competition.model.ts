export class Competition {
    id: number;
    tournament_id: number;
    season_id: number;
    title: string;
    active: boolean | null;
    ended: boolean | null;
    participants: number | null;
    players_in_group: number | null;
    first_playoff_stage: number | null;
    number_in_season: number;
    active_round: number | null;
}