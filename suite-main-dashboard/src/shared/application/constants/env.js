export const { NODE_ENV } = process.env;
export const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_GEOCODE_KEY || 'AIzaSyALbGWeYKcBxYNuUG7JkskYkKoiOExmfAA';
export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
export const COUNTRIES_TO_GENERATE_SEARCH = process.env.REACT_APP_COUNTRIES_TO_GENERATE_SEARCH || 'Colombia';
export const URL_PROD = process.env.REACT_APP_URL_PROD || 'http://localhost:3001/api_front/v1/';
export const PROD_ENV = process.env.REACT_APP_PROD_ENV || 'testing';
