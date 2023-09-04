import { NODE_ENV, URL_PROD } from '../../application/constants/env';

export const urlBase = NODE_ENV === 'development' ? 'http://localhost:3007/api/v1/' : URL_PROD;

export default {};
