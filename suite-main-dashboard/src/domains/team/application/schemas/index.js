import * as yup from 'yup';
import { addPeopleFields } from '../constants/addPeople';
import { ERROR_MESSAGES } from '../../../../shared/infrastructure/i18n/locales/translation_keys';

const teamGeneralValidation = {
	[addPeopleFields.ACCESS_ROLE]: yup.string().required(ERROR_MESSAGES.EMPTY_FIELD),
	[addPeopleFields.MODULES]: yup
		.array()
		.required(ERROR_MESSAGES.EMPTY_FIELD)
		.test('valid-min-array', ERROR_MESSAGES.INVALID_ARRAY, (value) => {
			return value && !value.every((item) => item === undefined);
		}),
};

export const teamValidation = {
	[addPeopleFields.EMAIL]: yup.string().email(ERROR_MESSAGES.INVALID_EMAIL_FORMAT).required(ERROR_MESSAGES.EMPTY_FIELD),
	[addPeopleFields.USERNAME]: yup.string(),
	...teamGeneralValidation,
};

export const teamSchema = yup.object().shape(teamValidation);

export const teamEditSchema = yup.object().shape(teamGeneralValidation);
