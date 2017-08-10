export const environment = {
    production: true,
    apiUrl: 'http://46.101.159.170/api/',
    apiImageNews: 'http://46.101.159.170/img/news/',
    apiImageClubs: 'http://46.101.159.170/img/clubs/',
    apiImageUsers: 'http://46.101.159.170/img/users/',
    apiImageAwards: 'http://46.101.159.170/img/awards/',
    apiImageTeams: 'http://46.101.159.170/img/teams/',
    apiSiteLogo: 'http://46.101.159.170/logo.png',
    imageUserDefault: 'default.png',
    imageTeamDefault: 'default.jpeg',
    imageSettings: {
        club: { maxSize: 200000, types: ["image/gif", "image/png"] },
        user: { maxSize: 500000, types: ["image/gif", "image/png", "image/jpg", "image/jpeg"] },
        news: { maxSize: 500000, types: ["image/jpg", "image/jpeg", "image/png"] },
        team: { maxSize: 524288, types: ["image/gif", "image/png", "image/jpg", "image/jpeg"] }
    },
    tournaments: {
        championship: {
            id: 1
        },
        team: {
            id: 3,
            participants_in_team: 4
        }
    }
};