import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setMessageToast } from '@vecindario/suite-dashboard-layout-lib';
import {
	postMakeAppointment,
	getAvailabilityOnDay as getAvailabilityOnDayService,
} from '../../../domains/appointment/infrastructure/api';
import { newAppointmentFields } from '../../../domains/dashboard/application/constants/appointment';
import { SERVER_SIDE_ERROR } from '../constants/messages/error-messages';
import { newAppointmentObject } from '../helpers/appointment';
import { setNewAppointmentModalOpen } from './core';
import { requestLastAppointments, requestNextAppointments } from './appointmentList';
import { addAppointmentToList } from '../../../domains/dashboard/application/slice/dashboard';
import { errorToast, successToast } from '../helpers/toast';

export const initialState = {
	[newAppointmentFields.NAME]: '',
	[newAppointmentFields.MOBILE]: '',
	[newAppointmentFields.LASTNAME]: '',
	[newAppointmentFields.EMAIL]: '',
	[newAppointmentFields.DATE_TYPE]: '',
	[newAppointmentFields.DATE_DAY]: '',
	[newAppointmentFields.DATE_HOUR]: '',
	[newAppointmentFields.SLUG]: '',
	loadingMakeAppointment: false,
	makeAppointmentError: null,
	successfulAppointment: false,
	loadingAvailability: false,
	availabilityError: null,
	availabilityOnDay: null,
};

export const makeAppointment = createAsyncThunk(
	'appointment/makeAppointment',
	async (message, { rejectWithValue, getState, dispatch }) => {
		try {
			const { appointment: appointmentData, project: projectState } = getState();
			const data = {
				[newAppointmentFields.NAME]: appointmentData[newAppointmentFields.NAME],
				[newAppointmentFields.LASTNAME]: appointmentData[newAppointmentFields.LASTNAME],
				[newAppointmentFields.MOBILE]: appointmentData[newAppointmentFields.MOBILE],
				[newAppointmentFields.EMAIL]: appointmentData[newAppointmentFields.EMAIL],
				[newAppointmentFields.DATE_HOUR]: appointmentData[newAppointmentFields.DATE_HOUR],
				[newAppointmentFields.DATE_TYPE]: appointmentData[newAppointmentFields.DATE_TYPE],
				[newAppointmentFields.DATE_DAY]: appointmentData[newAppointmentFields.DATE_DAY],
			};
			const slug = appointmentData[newAppointmentFields.SLUG];
			const response = await postMakeAppointment(slug, data);
			dispatch(requestLastAppointments());
			dispatch(requestNextAppointments());
			if (response) {
				dispatch(setNewAppointmentModalOpen(false));
				dispatch(setMessageToast(successToast(message)));

				const selectedProject = projectState.myProjects.find((project) => project.slug === slug);
				dispatch(addAppointmentToList(newAppointmentObject(appointmentData, selectedProject, slug, response)));
				return response;
			}
			dispatch(setMessageToast(errorToast(SERVER_SIDE_ERROR)));
			return rejectWithValue('Ha ocurrido un error');
		} catch (error) {
			dispatch(setMessageToast(errorToast(SERVER_SIDE_ERROR)));
			return rejectWithValue(error);
		}
	},
);

export const getAvailabilityOnDay = createAsyncThunk(
	'appointment/getAvailabilityOnDay',
	async (date, { rejectWithValue, getState }) => {
		const { appointment, user } = getState();
		const { slug, appointment_type } = appointment;
		const {
			currentUser: { email },
		} = user;
		try {
			const response = await getAvailabilityOnDayService(slug, date, email, appointment_type);
			if (response?.calendars) {
				return response;
			}
			return rejectWithValue(SERVER_SIDE_ERROR);
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

const Appointment = createSlice({
	name: 'appointment',
	initialState,
	reducers: {
		setFormData(state, { payload }) {
			Object.keys(payload).forEach((key) => {
				if (typeof initialState[key] !== 'undefined') {
					state[key] = payload[key];
				}
			});
		},
		clearSelectedValues(state) {
			state[newAppointmentFields.DATE_DAY] = '';
			state[newAppointmentFields.SLUG] = '';
			state[newAppointmentFields.DATE_HOUR] = '';
			state[newAppointmentFields.DATE_TYPE] = '';
		},
	},
	extraReducers: {
		[makeAppointment.pending]: (state) => {
			state.loadingMakeAppointment = true;
			state.makeAppointmentError = null;
		},
		[makeAppointment.rejected]: (state, { payload }) => {
			state.loadingMakeAppointment = false;
			state.makeAppointmentError = payload;
		},
		[makeAppointment.fulfilled]: (state, { payload }) => {
			state.successfulAppointment = true;
			state.loadingMakeAppointment = false;
			state.makeAppointmentResponse = payload;
		},
		[getAvailabilityOnDay.pending]: (state) => {
			state.loadingAvailability = true;
			state.availabilityError = null;
		},
		[getAvailabilityOnDay.rejected]: (state, { payload }) => {
			state.loadingAvailability = false;
			state.availabilityError = payload;
		},
		[getAvailabilityOnDay.fulfilled]: (state, { payload }) => {
			const { calendars, general_busy_times } = payload;
			state.availabilityOnDay = calendars;
			state.generalBusyTimes = general_busy_times;
		},
	},
});

export const { setFormData, clearSelectedValues } = Appointment.actions;

export default Appointment.reducer;
