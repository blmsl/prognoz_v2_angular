export class News {
    id:             number;
    title:          string;
    body:           string;
    image:          string;
    tournament_id:  number;
    tournament: {
        id: number;
        title: string;
    }
}