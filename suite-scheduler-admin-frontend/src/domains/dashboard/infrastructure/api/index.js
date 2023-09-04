import { authHeader, handleResponse } from '../../../../shared/infrastructure/api/apiHandler';
import {
	urlFetchSchedulerPermissions,
	urlGetAppointments,
	urlUpdateAppointmentState,
	urlUpdateAppointmentType,
} from './backendUrls';

export const getAppointments = (slug = null, page = 1, per_page = 2, list = 'following', search = null) => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};

	const urlAppointments = `${urlGetAppointments}?page=${page}&per_page=${per_page}&list=${list}${
		search ? `&search=${search}` : ''
	}${slug ? `&slug=${slug}` : ''}`;

	return fetch(urlAppointments, requestOptions).then(handleResponse);
};

export const updateAppointmentState = (id, data) => {
	const requestOptions = {
		method: 'PATCH',
		headers: authHeader(),
		body: JSON.stringify(data),
	};

	return fetch(urlUpdateAppointmentState(id), requestOptions).then(handleResponse);
};

export const updateAppointmentType = (id, data) => {
	const requestOptions = {
		method: 'PATCH',
		headers: authHeader(),
		body: JSON.stringify(data),
	};

	return fetch(urlUpdateAppointmentType(id), requestOptions).then(handleResponse);
};

export const getSchedulerPermissions = (slug, user_email) => {
	const requestOptions = {
		method: 'POST',
		headers: authHeader(),
		body: JSON.stringify({ user_email }),
	};
	return fetch(urlFetchSchedulerPermissions(slug), requestOptions).then(handleResponse);
};
