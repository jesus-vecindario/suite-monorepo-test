import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
import { getLastAppointments, getNextAppointments } from '../../../domains/appointment/infrastructure/api';

export const NEXT_APPOINTMENT_TYPE = 0x01;
export const LAST_APPOINTMENT_TYPE = 0x02;

export const initialState = {
	nextAppointments: {
		data: [],
		lastCall: null,
		loading: false,
	},
	lastAppointments: {
		data: [],
		lastCall: null,
		loading: false,
	},
};

export const requestNextAppointments = createAsyncThunk(
	'get-next-appointments',
	async (limitHours = '', { rejectWithValue }) => {
		try {
			return getNextAppointments(limitHours);
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

export const requestLastAppointments = createAsyncThunk('get-last-appointments', async (_, { rejectWithValue }) => {
	try {
		return getLastAppointments();
	} catch (error) {
		return rejectWithValue(error);
	}
});

const AppointmentListSlice = createSlice({
	initialState,
	name: 'appointment-list',
	extraReducers: {
		[requestNextAppointments.pending]: (state) => {
			state.nextAppointments.loading = true;
		},
		[requestNextAppointments.fulfilled]: (state, { payload }) => {
			state.nextAppointments.loading = false;
			state.nextAppointments.lastCall = moment();
			state.nextAppointments.data = payload || [];
		},
		[requestLastAppointments.pending]: (state) => {
			state.lastAppointments.loading = true;
		},
		[requestLastAppointments.fulfilled]: (state, { payload }) => {
			state.lastAppointments.loading = false;
			state.lastAppointments.lastCall = moment();
			state.lastAppointments.data = payload || [];
		},
	},
});

export default AppointmentListSlice.reducer;
