import * as yup from 'yup';
import {
	INVALID_EMAIL_FORMAT,
	EMPTY_FIELD,
	INVALID_PHONE,
	EMPTY_OPTION,
	EMPTY_DATE,
	EMPTY_HOUR,
	WRONG_NAME,
	WRONG_LASTNAME,
} from '../../../../shared/application/constants/messages/error-messages';
import { NAME_FORMAT } from '../../../../shared/application/constants/utils';
import { newAppointmentFields } from '../constants/appointment';

function isValidEmail(msg) {
	return yup.string().test('isValidEmail', msg, async (value) => {
		const emailValidation = yup.string().email();
		if (await emailValidation.isValid(value)) {
			const characterValidation = yup.string().matches(/[À-ÿ\u00f1\u00d1]/);
			return !(await characterValidation.isValid(value));
		}
		return false;
	});
}

yup.addMethod(yup.string, 'isValidEmail', isValidEmail);

const schedulerValidation = {
	[newAppointmentFields.NAME]: yup.string().matches(NAME_FORMAT, WRONG_NAME).required(EMPTY_FIELD),
	[newAppointmentFields.LASTNAME]: yup.string().matches(NAME_FORMAT, WRONG_LASTNAME).required(EMPTY_FIELD),
	[newAppointmentFields.MOBILE]: yup.number().typeError(INVALID_PHONE).positive(INVALID_PHONE).required(EMPTY_FIELD),
	[newAppointmentFields.EMAIL]: yup.string().isValidEmail(INVALID_EMAIL_FORMAT).required(EMPTY_FIELD),
	[newAppointmentFields.DATE_DAY]: yup.string().required(EMPTY_DATE),
	[newAppointmentFields.DATE_HOUR]: yup.string().required(EMPTY_HOUR),
	[newAppointmentFields.DATE_TYPE]: yup.string().required(EMPTY_OPTION),
};

const newAppointmentSchema = yup.object().shape(schedulerValidation);

export default newAppointmentSchema;
