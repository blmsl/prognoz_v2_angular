export const environment = {
    production: false,
    API_URL: 'http://prognoz-rest.local/api/',
    API_IMAGE_NEWS: 'http://prognoz-rest.local/img/news/',
    API_IMAGE_CLUBS: 'http://prognoz-rest.local/img/clubs/',
    API_IMAGE_USERS: 'http://prognoz-rest.local/img/users/',
    API_IMAGE_AWARDS: 'http://prognoz-rest.local/img/awards/',
    API_SITE_LOGO: 'http://prognoz-rest.local/logo.png',
    IMAGE_USER_DEFAULT: 'default.png',
    IMAGE_SETTINGS: {
        CLUB: { maxSize: 200000, types: ["image/gif", "image/png"] },
        USER: { maxSize: 500000, types: ["image/gif", "image/png", "image/jpg", "image/jpeg"] },
        NEWS: { maxSize: 500000, types: ["image/jpg", "image/jpeg", "image/png"] }
    }
};
