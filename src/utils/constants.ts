export const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const APIHost = development ? '/api' : 'http://api.freemics.tech/';

export const ACCESS_TOKEN_KEY = 'comic_system_auth_token';
