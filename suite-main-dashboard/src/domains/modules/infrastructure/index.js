import { authHeader, handleResponse } from '../../../shared/infrastructure/api/apiHandler';
import { urlGetActiveModules, urlGetModules, urlToggleModules } from './backendUrls';

export const getActiveModules = (slug) => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};
	return fetch(urlGetActiveModules(slug), requestOptions).then(handleResponse);
};

export const postToggleActive = (slug, moduleId) => {
	const requestOptions = {
		method: 'POST',
		headers: authHeader(),
		body: JSON.stringify({ module_id: moduleId }),
	};
	return fetch(urlToggleModules(slug), requestOptions).then(handleResponse);
};

export const getModulesRequest = () => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};

	return fetch(urlGetModules, requestOptions).then(handleResponse);
};

export default {};
