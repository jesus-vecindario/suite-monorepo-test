import { cleanRestDays } from '../../../domains/projectAvailability/application/helpers/project';
import { getHourFormatByNumber } from './date';
import {
	APPOINTMENT_TYPES_PERMISSIONS,
	userDetailFields,
} from '../../../domains/profile/application/constants/myProfile';
import { emailProviders } from '../../../domains/authentication/application/constants/Login';
import { GOOGLE_LOGO, MICROSOFT_LOGO } from '../constants/images';

export const transformAttentionDays = (attention_days) => {
	return cleanRestDays(attention_days).map((attention_day) => {
		const day = parseInt(attention_day.slice(-1));
		return {
			day_of_week: day - 1,
			begin_hour: getHourFormatByNumber(attention_days[attention_day].hourStart),
			end_hour: getHourFormatByNumber(attention_days[attention_day].hourEnd),
		};
	});
};

export const transformUserScheduleData = (data) => {
	const res = {};
	res[userDetailFields.TIME_AVAILABILITY] = transformAttentionDays(data[userDetailFields.TIME_AVAILABILITY]);
	res[userDetailFields.APPOINTMENT_TYPES] = APPOINTMENT_TYPES_PERMISSIONS[data[userDetailFields.APPOINTMENT_TYPES]];
	return res;
};

export const syncEmailLogo = (provider) => (provider === emailProviders.GOOGLE ? GOOGLE_LOGO : MICROSOFT_LOGO);
