import * as yup from 'yup';
import {
	EMPTY_FIELD,
	EMPTY_IMAGE_FIELD,
	EMPTY_OPTION,
	INVALID_LOCATION,
	min_characters,
} from '../../constants/messages/error-messages';
import { projectFields } from '../../constants/project';
import { validLocation } from '../../../../../shared/application/helpers/geo-helper';
import { URL_FORMAT_REGEX } from '../../../../../shared/application/constants/project';
import { INVALID_URL_FORMAT } from '../../../../../shared/application/constants/messages/error-messages';

function isValidLocation(msg) {
	return yup.object().test('isValidLocation', msg, async (value) => {
		return typeof value !== 'undefined' && validLocation(value);
	});
}

yup.addMethod(yup.object, 'isValidLocation', isValidLocation);

export const projectValidation = {};
projectValidation[projectFields.NAME] = yup.string().min(3, min_characters(3)).required(EMPTY_FIELD);
projectValidation[projectFields.TYPE] = yup.string().required(EMPTY_OPTION);
projectValidation[projectFields.STATUS] = yup.string().required(EMPTY_OPTION);
projectValidation[projectFields.LOGO] = yup.string().required(EMPTY_IMAGE_FIELD);
projectValidation[projectFields.ADDRESS] = yup.string().min(3, min_characters(3)).required(EMPTY_FIELD);
projectValidation[projectFields.LOCATION] = yup.object().isValidLocation(INVALID_LOCATION);
projectValidation[projectFields.DATA_AUTHORIZATION] = yup
	.string()
	.nullable()
	.matches(URL_FORMAT_REGEX, { excludeEmptyString: true, message: INVALID_URL_FORMAT });
projectValidation[projectFields.TERMS_AND_CONDITIONS] = yup
	.string()
	.nullable()
	.matches(URL_FORMAT_REGEX, { excludeEmptyString: true, message: INVALID_URL_FORMAT });
projectValidation[projectFields.PROCESSING_OF_PERSONAL_DATA] = yup
	.string()
	.nullable()
	.matches(URL_FORMAT_REGEX, { excludeEmptyString: true, message: INVALID_URL_FORMAT });

export const projectSchema = yup.object().shape(projectValidation);

export const SET_VALUE_OPTIONS = {
	shouldValidate: true,
	shouldDirty: true,
};

export const setManualError = (message) => {
	return { type: 'manual', message };
};
