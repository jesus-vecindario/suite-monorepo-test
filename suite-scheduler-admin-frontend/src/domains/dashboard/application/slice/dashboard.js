import moment from 'moment';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAppointments } from '../../infrastructure/api';
import { newAppointmentFields } from '../constants/appointment';
import { cleanDuplicates, existAppointment } from '../helpers/appointments';

export const initialState = {
	appointments: {},
	loading: false,
	searchLoading: false,
	searchResult: {},
	error: '',
	appointmentsRequested: false,
	closePopoverDashboard: false,
};

export const fetchAppointments = createAsyncThunk(
	'get-appointments',
	async (data = {}, { rejectWithValue, getState }) => {
		try {
			const { page, per_page, list } = data;
			return await getAppointments(getState().project.currentProject.slug, page, per_page, list);
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

export const fetchSearchAppointments = createAsyncThunk(
	'fetchSearchAppointments',
	async (data = {}, { rejectWithValue }) => {
		try {
			const { page, per_page, list, search, slug } = data;

			return await getAppointments(slug, page, per_page, list, search);
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

const DashboardSlice = createSlice({
	initialState,
	name: 'dashboard',
	reducers: {
		updateAppointment(state, { payload }) {
			const date = moment(payload.appointment_date).format(moment.HTML5_FMT.DATE);
			const day = state.appointments[date].map((appointment) => {
				if (appointment.id === payload.id) {
					return { ...appointment, ...payload };
				}
				return appointment;
			});
			state.appointments = {
				...state.appointments,
				[date]: day,
			};
			state.appointments = cleanDuplicates(state.appointments);
		},
		addAppointmentToList(state, { payload }) {
			const dateKey = newAppointmentFields.DATE_DAY;
			const previousValue = state.appointments[payload[dateKey]] || [];
			const appointment = { ...payload };
			delete appointment[dateKey];
			if (!existAppointment(previousValue, payload)) {
				state.appointments = {
					...state.appointments,
					[payload[dateKey]]: [...previousValue, appointment],
				};
			}
			state.appointments = cleanDuplicates(state.appointments);
		},
		setClosePopoverDashboard(state, { payload }) {
			state.closePopoverDashboard = payload;
		},
		clearSearchResult(state) {
			state.searchResult = {};
			state.isSearching = false;
		},
	},
	extraReducers: {
		[fetchAppointments.pending]: (state) => {
			state.loading = true;
			state.error = '';
		},
		[fetchAppointments.fulfilled]: (state, { payload }) => {
			state.appointments = cleanDuplicates(payload);
			state.loading = false;
			state.appointmentsRequested = true;
		},
		[fetchAppointments.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
		[fetchSearchAppointments.pending]: (state) => {
			state.searchLoading = true;
			state.error = '';
		},
		[fetchSearchAppointments.fulfilled]: (state, { payload }) => {
			state.searchResult = payload;
			state.searchLoading = false;
			state.isSearching = true;
		},
		[fetchSearchAppointments.rejected]: (state, { payload }) => {
			state.searchLoading = false;
			state.error = payload;
			state.isSearching = false;
		},
	},
});

export const { addAppointmentToList, updateAppointment, setClosePopoverDashboard, clearSearchResult } =
	DashboardSlice.actions;

export default DashboardSlice.reducer;
