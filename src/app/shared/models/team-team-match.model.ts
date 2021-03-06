export class TeamTeamMatch {
    id:                      number;
    competition_id:          number;
    home_team_id:            number;
    away_team_id:            number;
    home_team_goalkeeper_id: number;
    away_team_goalkeeper_id: number;
    home:                    number;
    away:                    number;
    home_points:             number;
    away_points:             number;
    home_dc_sum:             number;
    away_dc_sum:             number;
    round:                   number;
    active:                  boolean;
    ended:                   boolean;
    home_team:               any;
    away_team:               any;
    home_team_goalkeeper:    any;
    away_team_goalkeeper:    any;
}