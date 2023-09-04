import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
	newAppointmentModalOpen: false,
	permissions: {},
};

const Core = createSlice({
	name: 'core',
	initialState,
	reducers: {
		setNewAppointmentModalOpen(state, { payload }) {
			state.newAppointmentModalOpen = payload;
		},
		setPermissions(state, { payload }) {
			state.permissions = payload;
		},
	},
});

export const { setNewAppointmentModalOpen, setPermissions } = Core.actions;

export default Core.reducer;
