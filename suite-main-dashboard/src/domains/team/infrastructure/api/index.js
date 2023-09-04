import { authHeader, handleResponse } from '../../../../shared/infrastructure/api/apiHandler';
import { urlDeleteTeam, urlGetTeam, urlPostTeam, urlPutTeam } from './backendUrls';

export const getTeamRequest = (slug) => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};
	return fetch(urlGetTeam(slug), requestOptions).then(handleResponse);
};

export const postTeamRequest = (slug, payload) => {
	const requestOptions = {
		method: 'POST',
		headers: authHeader(),
		body: JSON.stringify(payload),
	};
	return fetch(urlPostTeam(slug), requestOptions).then(handleResponse);
};

export const putTeamRequest = ({ projectAccessId, slug }, payload) => {
	const requestOptions = {
		method: 'PUT',
		headers: authHeader(),
		body: JSON.stringify(payload),
	};
	return fetch(urlPutTeam(projectAccessId, slug), requestOptions).then(handleResponse);
};

export const deleteTeamRequest = (projectAccessId, slug) => {
	const requestOptions = {
		method: 'DELETE',
		headers: authHeader(),
	};

	return fetch(urlDeleteTeam(projectAccessId, slug), requestOptions).then(handleResponse);
};

export default {};
