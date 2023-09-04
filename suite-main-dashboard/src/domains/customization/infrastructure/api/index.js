import { fetchCreateCustomization, fetchCustomTheme, fetchUpdateCustomization } from './backendUrls';
import { authHeader, handleResponse } from '../../../../shared/infrastructure/api/apiHandler';

export const getFetchCustomTheme = (slug) => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};
	return fetch(fetchCustomTheme(slug), requestOptions).then(handleResponse);
};

export const postFetchCreateCustomization = (slug, data) => {
	const requestOptions = {
		method: 'POST',
		headers: authHeader(),
		body: JSON.stringify(data),
	};
	return fetch(fetchCreateCustomization(slug), requestOptions).then(handleResponse);
};

export const patchFetchUpdateCustomization = (slug, data) => {
	const requestOptions = {
		method: 'PATCH',
		headers: authHeader(),
		body: JSON.stringify(data),
	};
	return fetch(fetchUpdateCustomization(slug), requestOptions).then(handleResponse);
};
