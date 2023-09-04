import { authHeader, handleResponse } from '../apiHandler';
import { urlGetModulesByProject, urlGetProjects } from './backendUrls';

export const getProjectsByCurrentUser = () => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};

	return fetch(urlGetProjects, requestOptions).then(handleResponse);
};

export const getModulesByCurrentProject = (slug) => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};

	return fetch(urlGetModulesByProject(slug), requestOptions).then(handleResponse);
};
