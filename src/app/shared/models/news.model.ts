export class News {
    id:            number;
    title:         string;
    body:          string;
    image:         string;
    tournament_id: number;
    tournament:    any;
    comments:      Array<any>;
}