import * as yup from 'yup';
import { projectFields } from '../constants/project';
import {
	ATTENTION_DAYS_ERROR,
	EMPTY_FIELD,
	EMPTY_OPTION,
} from '../../../../shared/application/constants/messages/error-messages';

function isValidDaysSchedule(msg) {
	return yup.object().test('isValidDaysSchedule', msg, (value) => {
		const validation = Object.keys(value).map((key) => {
			return value[key].isRestDay || value[key].hourStart < value[key].hourEnd;
		});
		return !validation.includes(false);
	});
}

yup.addMethod(yup.object, 'isValidDaysSchedule', isValidDaysSchedule);

const projectValidation = {
	[projectFields.SCHEDULING_TIME]: yup.string().required(EMPTY_OPTION),
	[projectFields.ATTENTION_DAYS]: yup.object().isValidDaysSchedule(ATTENTION_DAYS_ERROR).required(EMPTY_FIELD),
};

export const projectSchema = yup.object().shape(projectValidation);

export const SET_VALUE_OPTIONS = {
	shouldValidate: true,
	shouldDirty: true,
};

export const setManualError = (message) => {
	return { type: 'manual', message };
};
