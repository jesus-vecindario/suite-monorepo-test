import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { myProjectsRoute } from '../../../../shared/infrastructure/routing/routes';
import { deleteCookie, removeQuery } from '../../../../shared/application/helpers/common-functions';
import { history } from '../../../../shared/application/helpers/history';
import { syncEmailCalendar } from '../../../profile/infrastructure/api';
import { updateProfile } from '../../../../shared/application/slices/myProfile';
import { postGoogleLogin, postMicrosoftLogin } from '../../infrastructure/api';

export const initialState = {
	loading: false,
	googleLoginSuccess: false,
	microsoftLoginSuccess: false,
};

const redirectAfterLogin = () => {
	history.push(myProjectsRoute);
};

export const googleLogin = createAsyncThunk('socialLogin/googleLogin', async (data, { rejectWithValue }) => {
	try {
		await postGoogleLogin(data);
		deleteCookie('current_activation');

		setTimeout(() => {
			removeQuery('code', 'state', 'prompt', 'scope', 'authuser');
		}, 200);

		redirectAfterLogin();

		return true;
	} catch (error) {
		removeQuery('code', 'state', 'prompt', 'scope', 'authuser');
		return rejectWithValue(error);
	}
});

export const syncCalendar = createAsyncThunk(
	'socialLogin/syncCalendarAccount',
	async (syncData, { rejectWithValue, dispatch }) => {
		try {
			const data = await syncEmailCalendar(syncData);
			dispatch(updateProfile(data));
			return true;
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

export const microsoftLogin = createAsyncThunk('socialLogin/microsoftLogin', async (data, { rejectWithValue }) => {
	try {
		await postMicrosoftLogin(data);
		deleteCookie('current_activation');

		setTimeout(() => {
			removeQuery('code', 'state', 'prompt', 'scope', 'authuser');
		}, 200);

		redirectAfterLogin();

		return true;
	} catch (error) {
		removeQuery('code', 'state', 'prompt', 'scope', 'authuser');
		return rejectWithValue(error);
	}
});

const socialLogin = createSlice({
	name: 'socialLogin',
	initialState,
	reducers: {},
	extraReducers: {
		[syncCalendar.pending]: (state) => {
			state.loading = true;
			state.error = null;
		},
		[syncCalendar.fulfilled]: (state) => {
			state.loading = false;
			state.googleLoginSuccess = true;
		},
		[syncCalendar.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
		[googleLogin.pending]: (state) => {
			state.loading = true;
			state.error = null;
		},
		[googleLogin.fulfilled]: (state) => {
			state.loading = false;
			state.googleLoginSuccess = true;
		},
		[googleLogin.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
		[microsoftLogin.pending]: (state) => {
			state.loading = true;
			state.error = null;
		},
		[microsoftLogin.fulfilled]: (state) => {
			state.loading = false;
			state.microsoftLoginSuccess = true;
		},
		[microsoftLogin.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
	},
});

export default socialLogin.reducer;
