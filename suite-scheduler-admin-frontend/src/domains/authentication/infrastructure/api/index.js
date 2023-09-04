import { authHeader, handleResponse } from '../../../../shared/infrastructure/api/apiHandler';
import {
	addInvitationTokenToParams,
	createSuiteUserCookie,
} from '../../../../shared/application/helpers/common-functions';
import { urlLoginGoogle, urlLoginMicrosoft } from './backendUrls';

export const postGoogleLogin = (data) => {
	const requestOptions = {
		method: 'POST',
		headers: authHeader(),
		body: JSON.stringify(addInvitationTokenToParams(data)),
	};

	return fetch(urlLoginGoogle, requestOptions)
		.then(handleResponse)
		.then((user) => {
			// store user details and jwt token in local storage to keep user logged in between page refreshes
			createSuiteUserCookie(JSON.stringify(user));
			return user;
		});
};

export const postMicrosoftLogin = (data) => {
	const requestOptions = {
		method: 'POST',
		headers: authHeader(),
		body: JSON.stringify(addInvitationTokenToParams(data)),
	};

	return fetch(urlLoginMicrosoft, requestOptions)
		.then(handleResponse)
		.then((user) => {
			// store user details and jwt token in local storage to keep user logged in between page refreshes
			createSuiteUserCookie(JSON.stringify(user));
			return user;
		});
};
