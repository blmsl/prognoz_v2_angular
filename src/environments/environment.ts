export const environment = {
    production: false,
    apiUrl: 'http://prognoz-rest.local/api/',
    apiImageNews: 'http://prognoz-rest.local/img/news/',
    apiImageClubs: 'http://prognoz-rest.local/img/clubs/',
    apiImageUsers: 'http://prognoz-rest.local/img/users/',
    apiImageAwards: 'http://prognoz-rest.local/img/awards/',
    apiSiteLogo: 'http://prognoz-rest.local/logo.png',
    imageUserDefault: 'default.png',
    imageSettings: {
        club: { maxSize: 204800, types: ["image/gif", "image/png"] },
        user: { maxSize: 512000, types: ["image/gif", "image/png", "image/jpg", "image/jpeg"] },
        news: { maxSize: 512000, types: ["image/jpg", "image/jpeg", "image/png"] }
    },
    tournaments: {
        championship: {
            id: 1
        }
    }
};
