import * as yup from 'yup';
import { INTERNATIONALIZATION_CONFIG_FIELD, projectFields, URL_FORMAT_REGEX } from '../../constants/project';
import { validLocation } from '../geo-helper';
import { ERROR_MESSAGES } from '../../../infrastructure/i18n/locales/translation_keys';

function isValidLocation(msg) {
	return yup.object().test('isValidLocation', msg, async (value) => {
		return typeof value !== 'undefined' && validLocation(value);
	});
}

yup.addMethod(yup.object, 'isValidLocation', isValidLocation);

export const projectValidation = {};
projectValidation[projectFields.NAME] = yup
	.string()
	.min(3, ERROR_MESSAGES.MIN_CHARACTERS)
	.required(ERROR_MESSAGES.EMPTY_FIELD);
projectValidation[projectFields.TYPE] = yup.string().required(ERROR_MESSAGES.EMPTY_OPTION);
projectValidation[projectFields.STATUS] = yup.string().nullable();
projectValidation[projectFields.LOGO] = yup.string().required(ERROR_MESSAGES.EMPTY_IMAGE_FIELD);
projectValidation[projectFields.CITY] = yup.string().required(ERROR_MESSAGES.EMPTY_OPTION);
projectValidation[projectFields.ADDRESS] = yup
	.string()
	.min(3, ERROR_MESSAGES.MIN_CHARACTERS)
	.required(ERROR_MESSAGES.EMPTY_OPTION);
projectValidation[projectFields.LOCATION] = yup.object().required(ERROR_MESSAGES.EMPTY_OPTION);
projectValidation[projectFields.DATA_AUTHORIZATION] = yup
	.string()
	.nullable()
	.matches(URL_FORMAT_REGEX, { excludeEmptyString: true, message: ERROR_MESSAGES.INVALID_URL_FORMAT });
projectValidation[projectFields.TERMS_AND_CONDITIONS] = yup
	.string()
	.nullable()
	.matches(URL_FORMAT_REGEX, { excludeEmptyString: true, message: ERROR_MESSAGES.INVALID_URL_FORMAT });
projectValidation[projectFields.PROCESSING_OF_PERSONAL_DATA] = yup
	.string()
	.nullable()
	.matches(URL_FORMAT_REGEX, { excludeEmptyString: true, message: ERROR_MESSAGES.INVALID_URL_FORMAT });
projectValidation[INTERNATIONALIZATION_CONFIG_FIELD] = yup.object().shape({
	[projectFields.CURRENCY]: yup.string().required(ERROR_MESSAGES.EMPTY_OPTION),
	[projectFields.UNIT_OF_MEASUREMENT]: yup.string().required(ERROR_MESSAGES.EMPTY_OPTION),
});
projectValidation[projectFields.LANGUAGE] = yup.string().required(ERROR_MESSAGES.EMPTY_OPTION);

export const projectSchema = yup.object().shape(projectValidation);

export const SET_VALUE_OPTIONS = {
	shouldValidate: true,
	shouldDirty: true,
};

export const setManualError = (message) => {
	return { type: 'manual', message };
};
