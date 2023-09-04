import { authHeader, handleResponse } from '../../../../shared/infrastructure/api/apiHandler';
import { urlSynchronizeStatus, urlSyncCalendar, urlMyTimeAvailability } from './backendUrls';

export const getSynchronizeStatus = (slug) => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};

	return fetch(urlSynchronizeStatus(slug), requestOptions).then(handleResponse);
};

export const updateMyProfile = (slug, body) => {
	const requestOptions = {
		method: 'PUT',
		headers: authHeader(),
		body: JSON.stringify(body),
	};

	return fetch(urlSynchronizeStatus(slug), requestOptions).then(handleResponse);
};

export const syncEmailCalendar = (body) => {
	const requestOptions = {
		method: 'POST',
		headers: authHeader(),
		body: JSON.stringify(body),
	};

	return fetch(urlSyncCalendar, requestOptions).then(handleResponse);
};

export const getMyTimeAvailability = (slug) => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};

	return fetch(urlMyTimeAvailability(slug), requestOptions).then(handleResponse);
};
