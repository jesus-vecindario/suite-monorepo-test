import { authHeader, handleResponse } from '../apiHandler';
import { urlGetModules } from './backendUrls';

export const getModulesRequest = () => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};

	return fetch(urlGetModules, requestOptions).then(handleResponse);
};

export default {};
