export const { NODE_ENV } = process.env;
export const URL_PROD = process.env.REACT_APP_URL_PROD || 'https://localhost:3001/api/v1/';
export const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_GEOCODE_KEY || 'AIzaSyALbGWeYKcBxYNuUG7JkskYkKoiOExmfAA';
export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
export const COUNTRIES_TO_GENERATE_SEARCH = process.env.REACT_APP_COUNTRIES_TO_GENERATE_SEARCH || 'Colombia';
export const MICROSOFT_CLIENT_ID = process.env.REACT_APP_MICROSOFT_CLIENT_ID;
export const MICROSOFT_REDIRECT_URI =
	process.env.REACT_APP_MICROSOFT_REDIRECT_URI || 'http://localhost:3002/users/login';
export const SCHEDULER_EMBEDDED =
	process.env.REACT_APP_SCHEDULER_EMBEDDED_URL ||
	'https://scheduler-client-embedded.s3.us-east-2.amazonaws.com/script-scheduler.js';
export const PROJECT_HELPER_ULR = process.env.REACT_APP_PROJECT_HELPER_URL || 'https://ayuda.agendador.vecindario.com';
