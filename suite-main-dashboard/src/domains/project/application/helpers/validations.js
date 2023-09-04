import * as yup from 'yup';
import { projectFields, URL_FORMAT_REGEX } from '../../../../shared/application/constants/project';
import {
	EMPTY_FIELD,
	EMPTY_IMAGE_FIELD,
	EMPTY_OPTION,
	INVALID_URL_FORMAT,
	min_characters,
} from '../../../../shared/application/constants/messages/error-messages';

export const projectValidation = {};
projectValidation[projectFields.NAME] = yup.string().nullable().min(3, min_characters(3)).required(EMPTY_FIELD);
projectValidation[projectFields.COMPANY] = yup.string().nullable();
projectValidation[projectFields.TYPE] = yup.string().nullable().required(EMPTY_OPTION);
projectValidation[projectFields.STATUS] = yup.string().nullable();
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
projectValidation[projectFields.LOGO] = yup.string().required(EMPTY_IMAGE_FIELD);

export const projectSchema = yup.object().shape(projectValidation);

export const SET_VALUE_OPTIONS = {
	shouldValidate: true,
	shouldDirty: true,
};

export const setManualError = (message) => {
	return { type: 'manual', message };
};
