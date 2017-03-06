export const environment = {
    production: true,
    API_URL: 'http://46.101.159.170/api/',
    API_IMAGE_NEWS: 'http://46.101.159.170/img/news/',
    API_IMAGE_CLUBS: 'http://46.101.159.170/img/clubs/',
    API_IMAGE_USERS: 'http://46.101.159.170/img/users/',
    API_IMAGE_AWARDS: 'http://46.101.159.170/img/awards/',
    API_SITE_LOGO: 'http://46.101.159.170/logo.png',
    IMAGE_USER_DEFAULT: 'default.png',
    IMAGE_SETTINGS: {
        CLUB: { maxSize: 200000, types: ["image/gif", "image/png"] },
        USER: { maxSize: 500000, types: ["image/gif", "image/png", "image/jpg", "image/jpeg"] },
        NEWS: { maxSize: 500000, types: ["image/jpg", "image/jpeg", "image/png"] }
    }
};
