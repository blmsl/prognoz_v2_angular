export const environment = {
    production: false,
    apiUrl: 'http://prognoz-rest.local/api/',
    apiImageNews: 'http://prognoz-rest.local/img/news/',
    apiImageClubs: 'http://prognoz-rest.local/img/clubs/',
    apiImageUsers: 'http://prognoz-rest.local/img/users/',
    apiImageAwards: 'http://prognoz-rest.local/img/awards/',
    apiImageTeams: 'http://prognoz-rest.local/img/teams/',
    apiSiteLogo: 'http://prognoz-rest.local/logo.png',
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
