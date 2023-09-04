import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMyTimeAvailability } from '../../../domains/profile/infrastructure/api';

export const initialState = {
	profile: {
		user_time_availability: {},
		project_access: [],
		userTimeAvailabilityRequested: false,
	},
	loading: false,
	error: '',
};

export const getMyAvailability = createAsyncThunk('myProfile/getMyAvailability', async (slug, { rejectWithValue }) => {
	try {
		return await getMyTimeAvailability(slug);
	} catch (e) {
		return rejectWithValue(e);
	}
});

const MyProfile = createSlice({
	name: 'myProfile',
	initialState,
	reducers: {
		setProfile(state, { payload }) {
			state.profile = { ...state.profile, ...payload };
		},
		updateProfile(state, { payload }) {
			state.profile = {
				...state.profile,
				user_time_availability: {
					...payload,
					attention_days: payload.user_time_availability,
				},
			};
			state.attention_days = payload.user_time_availability;
			state.appointment_type = payload.appointment_type;
		},
	},
	extraReducers: {
		[getMyAvailability.pending]: (state) => {
			state.loading = true;
		},
		[getMyAvailability.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.profile.user_time_availability = payload;
			state.profile.userTimeAvailabilityRequested = true;
		},
		[getMyAvailability.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
			state.profile.user_time_availability = {};
		},
	},
});

export const { setProfile, updateProfile } = MyProfile.actions;

export default MyProfile.reducer;
