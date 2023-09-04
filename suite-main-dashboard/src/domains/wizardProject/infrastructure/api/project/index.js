import { authHeader, handleResponse } from '../../../../../shared/infrastructure/api/apiHandler';
import { urlCreateProject } from '../backendUrls';

export const createProject = (body) => {
	const requestOptions = {
		method: 'POST',
		headers: authHeader(),
		body,
	};
	requestOptions.headers.delete('Content-Type');
	return fetch(urlCreateProject, requestOptions).then(handleResponse);
};

export default {};
