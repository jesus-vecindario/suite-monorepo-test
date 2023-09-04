import moment from 'moment';
import 'moment/locale/es';

import { capitalize } from './common-functions';

export const MOMENT_FORMATS = {
	ONLY_DAY_FORMAT: 'dddd',
	FULL_DATE: 'LL',
	HOUR_AND_MINUTES_WITH_TIME_FORMAT: 'hh:mm a',
	HOUR_AND_MINUTES_FORMAT: 'HH:mm',
	NOTIFICATIONS_FORMAT: 'dddd, DD [de] MMM [-] HH:mm',
	NEXT_APPOINTMENT_HOUR_FORMAT: 'h:mm',
};

export const TIME_CONVERSIONS = {
	millisecond: 1,
	second: 1000,
	minute: 60000,
	hour: 3600000,
};

export const formatScheduleNotificationDate = (date) => {
	return date && capitalize(moment(date).format(MOMENT_FORMATS.NOTIFICATIONS_FORMAT));
};

export const getHourFromDate = (date) => date && moment(date).format(MOMENT_FORMATS.NEXT_APPOINTMENT_HOUR_FORMAT);

export const getNameDayByNumber = (numberDay, format = MOMENT_FORMATS.ONLY_DAY_FORMAT) =>
	numberDay && capitalize(moment().day(numberDay).format(format));

export const getHourFormatByNumber = (hours, withTime = false) =>
	moment
		.utc(hours * 3600 * 1000)
		.format(withTime ? MOMENT_FORMATS.HOUR_AND_MINUTES_WITH_TIME_FORMAT : MOMENT_FORMATS.HOUR_AND_MINUTES_FORMAT);

export const formatDate = (
	date,
	format = MOMENT_FORMATS.HOUR_AND_MINUTES_FORMAT,
	parseTo = MOMENT_FORMATS.HOUR_AND_MINUTES_WITH_TIME_FORMAT,
) => moment(date, format).format(parseTo);

export const getFullDateWithDay = (rawDate) => {
	const day = capitalize(moment(rawDate).format(MOMENT_FORMATS.ONLY_DAY_FORMAT));
	const date = moment(rawDate).format(MOMENT_FORMATS.FULL_DATE);
	return `${day}, ${date}`;
};

export const isSameDay = (date) => {
	const actualDate = moment();
	return actualDate.isSame(date, 'date');
};
