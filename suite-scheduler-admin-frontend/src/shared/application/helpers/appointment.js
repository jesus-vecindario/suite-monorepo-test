import moment from 'moment';
import { newAppointmentFields } from '../../../domains/dashboard/application/constants/appointment';

export const scheduleToAppointmentData = (schedule) => {
	const { user_snapshot_detail } = schedule;
	const userData = {
		...user_snapshot_detail,
		name: user_snapshot_detail.first_name,
		lastname: user_snapshot_detail.last_name,
	};
	const newObject = {
		...userData,
		[newAppointmentFields.SLUG]: schedule?.project?.slug,
		[newAppointmentFields.DATE_TYPE]: schedule?.appointment_type,
	};
	delete newObject.avatar;

	return newObject;
};

const parseDateHour = (stringHour) => {
	if (!stringHour) return '';
	const parsedHour = stringHour?.replace('AM', '')?.replace('PM', '')?.trim();
	const [, minutes] = parsedHour.split(':');
	let [hour] = parsedHour.split(':');
	if (stringHour.includes('PM') && hour >= 1 && hour < 12) {
		hour = Number(hour) + 12;
		hour = hour.toString();
	}
	return {
		hour,
		minutes,
	};
};

export const newAppointmentObject = (appointmentData, selectedProject, slug, response) => {
	const schedulingTime = selectedProject?.scheduling_time || 15;
	const date = moment(`${appointmentData[newAppointmentFields.DATE_DAY]}`).utcOffset('-0500');

	const hourObj = parseDateHour(appointmentData[newAppointmentFields.DATE_HOUR]);
	date.set({ hour: hourObj.hour, minutes: hourObj.minutes });

	const hour = `${date.format('H:mm')} - ${date.add(schedulingTime, 'minutes').format('H:mm')}`;

	return {
		id: response.id,
		appointment_date: new Date(
			`${appointmentData[newAppointmentFields.DATE_DAY]} ${appointmentData[newAppointmentFields.DATE_HOUR]} -500'`,
		),
		appointment_type: appointmentData[newAppointmentFields.DATE_TYPE],
		duration: schedulingTime,
		hour,
		[newAppointmentFields.DATE_DAY]: appointmentData[newAppointmentFields.DATE_DAY],
		link: response?.link,
		project: { slug, title: selectedProject.title },
		state: 'pending',
		user_snapshot_detail: {
			email: appointmentData[newAppointmentFields.EMAIL],
			first_name: appointmentData[newAppointmentFields.NAME],
			identification: null,
			identification_type: null,
			last_name: appointmentData[newAppointmentFields.LASTNAME],
			mobile: appointmentData[newAppointmentFields.MOBILE].toString(),
		},
	};
};
