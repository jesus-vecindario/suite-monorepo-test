import { authHeader, handleResponse } from '../../../../shared/infrastructure/api/apiHandler';
import {
	urlAppointmentStats,
	urlGetAvailabilityOnDay,
	urlLastAppointments,
	urlNextAppointments,
	urlPostMakeAppointment,
} from './backendUrls';
import { urlUpdateAppointmentState, urlUpdateAppointmentType } from '../../../dashboard/infrastructure/api/backendUrls';

export const getAppointmentStats = (projectSlug = '') => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};
	return fetch(urlAppointmentStats(projectSlug), requestOptions).then(handleResponse);
};

export const postMakeAppointment = (slug, data) => {
	const requestOptions = {
		method: 'POST',
		headers: authHeader(),
		body: JSON.stringify(data),
	};
	return fetch(urlPostMakeAppointment(slug), requestOptions).then(handleResponse);
};

export const getAvailabilityOnDay = (slug, date, email, appointmentType) => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};
	return fetch(urlGetAvailabilityOnDay(slug, date, email, appointmentType), requestOptions).then(handleResponse);
};

export const getNextAppointments = (limitHours = '') => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};
	return fetch(urlNextAppointments(limitHours), requestOptions).then(handleResponse);
};

export const getLastAppointments = () => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};
	return fetch(urlLastAppointments, requestOptions).then(handleResponse);
};

export const updateAppointmentType = (id, data) => {
	const requestOptions = {
		method: 'PATCH',
		headers: authHeader(),
		body: JSON.stringify(data),
	};
	return fetch(urlUpdateAppointmentType(id), requestOptions).then(handleResponse);
};

export const updateAppointmentState = (id, data) => {
	const requestOptions = {
		method: 'PATCH',
		headers: authHeader(),
		body: JSON.stringify(data),
	};
	return fetch(urlUpdateAppointmentState(id), requestOptions).then(handleResponse);
};
