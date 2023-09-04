import { authHeader, handleResponse } from '../../../../shared/infrastructure/api/apiHandler';
import {
	urlCreateProject,
	urlGetProject,
	urlGetProjects,
	urlFetchProjectBySlug,
	urlEditProject,
	urlToggleActiveProject,
} from './backendUrls';

export const getProjectsByCurrentUser = () => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};

	return fetch(urlGetProjects, requestOptions).then(handleResponse);
};

export const getProjectAvailability = (slug, noCamelize = false) => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};
	return fetch(urlGetProject(slug, noCamelize), requestOptions).then(handleResponse);
};

export const createProject = (body) => {
	const requestOptions = {
		method: 'POST',
		headers: authHeader(),
		body,
	};
	requestOptions.headers.delete('Content-Type');
	return fetch(urlCreateProject, requestOptions).then(handleResponse);
};

export const editProjectRequest = (slug, body) => {
	const requestOptions = {
		method: 'PUT',
		headers: authHeader(),
		body,
	};
	requestOptions.headers.delete('Content-Type');
	return fetch(urlEditProject(slug), requestOptions).then(handleResponse);
};

export const fetchProjectBySlug = (slug) => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};
	return fetch(urlFetchProjectBySlug(slug), requestOptions).then(handleResponse);
};

export const postToggleActive = (slug) => {
	const requestOptions = {
		method: 'PATCH',
		headers: authHeader(),
	};
	return fetch(urlToggleActiveProject(slug), requestOptions).then(handleResponse);
};
