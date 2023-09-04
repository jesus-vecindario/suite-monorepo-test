import { createSelector } from '@reduxjs/toolkit';
import { fullNameReduced } from '../helpers/common-functions';
import { LAST_APPOINTMENT_TYPE, NEXT_APPOINTMENT_TYPE } from '../slices/appointmentList';

export const appointmentState = (state) => state.appointment;

export const getBusyTimeOnDay = createSelector(appointmentState, (appointment) => appointment?.availabilityOnDay);

export const appointmentListState = (state) => state.appointmentList;
export const nextAppointmentsState = (state) => appointmentListState(state).nextAppointments;
export const lastAppointmentsState = (state) => appointmentListState(state).lastAppointments;

export const myNextAppointments = createSelector(nextAppointmentsState, (nextAppointments) => {
	const { data } = nextAppointments;
	return data.map((appointment) => {
		const { client_details = {}, id, appointment_date, appointment_type } = appointment;
		const { name, lastname, email } = client_details;
		const completeName = fullNameReduced(name, lastname, email);
		return { id, name: completeName, date: appointment_date, type: appointment_type };
	});
});

export const myLastAppointments = createSelector(lastAppointmentsState, (lastAppointments) => {
	const { data } = lastAppointments;
	return data.map(({ appointment_date: date, id }) => ({ date, id }));
});

export const appointmentListLastCall = (appointmentType) => {
	switch (appointmentType) {
		case NEXT_APPOINTMENT_TYPE:
			return createSelector(nextAppointmentsState, (state) => state.lastCall);
		case LAST_APPOINTMENT_TYPE:
			return createSelector(lastAppointmentsState, (state) => state.lastCall);
		default:
			return null;
	}
};
