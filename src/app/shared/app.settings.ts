export const API_URL = 'http://prognoz-rest.local/api/';
export const API_IMAGE_NEWS = 'http://prognoz-rest.local/img/news/';
export const API_IMAGE_CLUBS = 'http://prognoz-rest.local/img/clubs/';
export const API_IMAGE_USERS = 'http://prognoz-rest.local/img/users/';
export const IMAGE_SETTINGS = {
    CLUB: { maxSize: 200000, types: ["image/gif", "image/png"] },
    USER: { maxSize: 500000, types: ["image/gif", "image/png", "image/jpg", "image/jpeg"] },
    NEWS: { maxSize: 500000, types: ["image/jpg", "image/jpeg", "image/png"] }
};