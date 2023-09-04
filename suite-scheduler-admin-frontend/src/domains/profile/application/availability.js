import { APPOINTMENT_TYPE_VALUES } from './constants/myProfile';

export const getAppointmentType = (appointmentType) => {
	if (appointmentType?.length === 1) return appointmentType[0];
	return APPOINTMENT_TYPE_VALUES.BOTH;
};

export default {};
