import { moduleKeys } from '@vecindario/suite-library';
import { PEOPLE_CONTAINER, TEAM } from '../../infrastructure/locales/translation_keys';

export const ADVISER_ROLE = 'asesor';
export const DIRECTOR_ROLE = 'director';
export const MARKETING_ROLE = 'marketing';

export const PEOPLE_DESCRIPTION = {};
PEOPLE_DESCRIPTION[DIRECTOR_ROLE] = TEAM.PEOPLE_DESCRIPTION_DIRECTOR;
PEOPLE_DESCRIPTION[ADVISER_ROLE] = TEAM.PEOPLE_DESCRIPTION_ADVISER;
PEOPLE_DESCRIPTION[MARKETING_ROLE] = TEAM.PEOPLE_DESCRIPTION_MARKETING;

export const addPeopleFields = {
	EMAIL: 'email',
	USERNAME: 'username',
	ACCESS_ROLE: 'access_role',
	MODULES: 'modules',
};

export const I18N_ROLE_KEY = Object.freeze({
	[DIRECTOR_ROLE]: PEOPLE_CONTAINER.DIRECTORS,
	[ADVISER_ROLE]: PEOPLE_CONTAINER.ADVISERS,
});

const modules_name = Object.values(moduleKeys);

export const MODULES_BY_ROLE = {
	[DIRECTOR_ROLE]: [...modules_name],
	[ADVISER_ROLE]: [
		moduleKeys.INVENTORY_KEY,
		moduleKeys.SCHEDULER_KEY,
		moduleKeys.LANDING_BUILDER_KEY,
		moduleKeys.COMMERCIAL_OPPORTUNITIES_KEY,
		moduleKeys.MORTGAGE_CREDITS_KEY,
		moduleKeys.CONTACT_REQUEST_KEY,
		moduleKeys.RESERVATION_KEY,
		moduleKeys.BUSINESS_KEY,
		moduleKeys.BUYER_NOTIFICATIONS_KEY,
		moduleKeys.COTIZADOR_KEY,
	],
	[MARKETING_ROLE]: [moduleKeys.LANDING_BUILDER_KEY, moduleKeys.BUYER_NOTIFICATIONS_KEY],
};

export const REQUIRED_MODULES_BY_ROLE = {
	[DIRECTOR_ROLE]: [moduleKeys.COMMERCIAL_OPPORTUNITIES_KEY, moduleKeys.BUSINESS_KEY],
	[ADVISER_ROLE]: [moduleKeys.COMMERCIAL_OPPORTUNITIES_KEY, moduleKeys.BUSINESS_KEY],
	[MARKETING_ROLE]: [],
};
