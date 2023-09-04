import { authHeader, handleResponse } from '../../../shared/infrastructure/api/apiHandler';
import { urlFetchProjectBySlug, urlUpdateProjectBySlug } from './backendUrls';

export const getProjectBySlug = (slug) => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};
	return fetch(urlFetchProjectBySlug(slug), requestOptions).then(handleResponse);
};

export const updateProjectBySlug = (slug, data) => {
	const requestOptions = {
		method: 'PUT',
		headers: authHeader(),
		body: JSON.stringify(data),
	};

	return fetch(urlUpdateProjectBySlug(slug), requestOptions).then(handleResponse);
};
