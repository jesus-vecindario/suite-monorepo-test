import { authHeader, handleResponse } from '../../../../shared/infrastructure/api/apiHandler';
import { urlPatchTrackingConfiguration } from './backendUrls';

export const patchTrackingConfiguration = (slug, payload = {}) => {
	const requestOptions = {
		method: 'PATCH',
		headers: authHeader(),
		body: JSON.stringify(payload),
	};
	return fetch(urlPatchTrackingConfiguration(slug), requestOptions).then(handleResponse);
};

export default {};
