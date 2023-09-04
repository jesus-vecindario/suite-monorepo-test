import * as yup from 'yup';
import {
	ATTENTION_DAYS_ERROR,
	EMPTY_FIELD,
	EMPTY_OPTION,
} from '../../../../shared/application/constants/messages/error-messages';

import { userDetailFields } from '../../../profile/application/constants/myProfile';

const schedulerValidation = {
	[userDetailFields.TIME_AVAILABILITY]: yup.object().isValidDaysSchedule(ATTENTION_DAYS_ERROR).required(EMPTY_FIELD),
	[userDetailFields.APPOINTMENT_TYPES]: yup.string().required(EMPTY_OPTION),
};
export const userSchedulerSchema = yup.object().shape(schedulerValidation);

export default {};
