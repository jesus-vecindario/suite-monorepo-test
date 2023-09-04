import { helpers } from '@vecindario/suite-library';
import { WIZARD_CREATION_STEPS } from '../constants/utils';
import { INVITATION_TOKEN } from '../constants/localStorageKeys';
import {
	wizardAddCalendarRoute,
	wizardCompleteUserDataRoute,
} from '../../../domains/authentication/infrastructure/routes';

export const {
	importResource,
	removeResource,
	removeMultipleResources,
	filterData,
	capitalize,
	createNumberArray,
	isObject,
	checkCookieExistence,
	isEmptyObject,
	getValueFromLocalStorage,
	getKeysFromObject,
	getCurrerntPath,
	createCookie,
	locationToParams,
	deleteCookie,
	removeQuery,
	isNumber,
	debounce,
	getFirstWord,
	fullNameReduced,
	copyTextToClipboard,
	dateToProjectDay,
	createSuiteUserCookie,
} = helpers.commonFunctions;

export const getCreationRedirectActivator = () => {
	const dataActivation = checkCookieExistence('current_activation');
	if (dataActivation) {
		try {
			const parsedData = JSON.parse(dataActivation);
			return [parsedData.invitationToken, wizardCompleteUserDataRoute];
		} catch {
			return ['', ''];
		}
	}
	let wizardCurrentStep = parseInt(checkCookieExistence('current_step_creation'));
	wizardCurrentStep = wizardCurrentStep.isNaN ? '' : wizardCurrentStep;
	if (wizardCurrentStep === WIZARD_CREATION_STEPS.calendar) {
		return [wizardCurrentStep, wizardAddCalendarRoute];
	}
	return ['', ''];
};

export const addInvitationTokenToParams = (params) => {
	const invitationToken = getValueFromLocalStorage(INVITATION_TOKEN);
	if (invitationToken && isObject(params)) {
		params = { ...params, invitation_token: invitationToken };
	}
	return params;
};
