import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setMessageToast } from '@vecindario/suite-dashboard-layout-lib';
import { history } from '../../../../shared/application/helpers/history';
import { deleteTeamRequest, getTeamRequest, postTeamRequest, putTeamRequest } from '../../infrastructure/api';
import { BUYER_NOTIFICATIONS, LANDING_BUILDER } from '../../../modules/application/constants/modules';
import { addPeopleFields, MARKETING_ROLE } from '../constants/addPeople';
import { TEAM } from '../../infrastructure/locales/translation_keys';
import { DOMAIN_NAME } from '../../infrastructure/locales';
import i18nInstance from '../../../../shared/infrastructure/i18n/config';

export const initialState = {
	arrayTeam: [],
	error: null,
	response: false,
};

const filterModulesByRole = (role, projectModules, userModules) => {
	const filterModules = projectModules.filter((module) => [BUYER_NOTIFICATIONS, LANDING_BUILDER].includes(module.name));
	const filteredModules =
		role === MARKETING_ROLE
			? userModules.filter((moduleId) => filterModules.some((module) => module.id === moduleId))
			: [...new Set(userModules)];
	return filteredModules;
};

export const getTeam = createAsyncThunk('team/getTeam', async (slug, { rejectWithValue }) => {
	try {
		const response = await getTeamRequest(slug);
		return response;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const postTeam = createAsyncThunk(
	'team/postTeam',
	async ({ slug, path, payload }, { rejectWithValue, dispatch, getState }) => {
		const data = {
			...payload,
			[addPeopleFields.MODULES]: filterModulesByRole(
				payload[addPeopleFields.ACCESS_ROLE],
				getState().project?.modulesByProject,
				payload[addPeopleFields.MODULES],
			),
		};

		try {
			const response = await postTeamRequest(slug, data);

			dispatch(
				setMessageToast({
					type: 'success',
					message: i18nInstance.t(TEAM.INVITED_USER, { ns: DOMAIN_NAME }),
				}),
			);
			history.push(path);
			return response;
		} catch (error) {
			dispatch(
				setMessageToast({
					type: 'error',
					message: i18nInstance.t(TEAM.FAILED_INVITED_USER, { ns: DOMAIN_NAME }),
				}),
			);
			return rejectWithValue(error);
		}
	},
);

export const putTeam = createAsyncThunk(
	'team/putTeam',
	async ({ projectAccessId, payload }, { rejectWithValue, dispatch, getState }) => {
		const data = {
			...payload,
			[addPeopleFields.MODULES]: filterModulesByRole(
				payload[addPeopleFields.ACCESS_ROLE],
				getState().project?.modulesByProject,
				payload[addPeopleFields.MODULES],
			),
		};
		try {
			const slug = getState().project?.currentProject?.slug;
			const response = await putTeamRequest({ projectAccessId, slug }, data);
			dispatch(
				setMessageToast({
					type: 'success',
					message: i18nInstance.t(TEAM.CHANGEDS_SUCCESSFULL, { ns: DOMAIN_NAME }),
				}),
			);
			return response;
		} catch (error) {
			dispatch(
				setMessageToast({
					type: 'error',
					message: i18nInstance.t(TEAM.CHANGEDS_ERROR, { ns: DOMAIN_NAME }),
				}),
			);
			return rejectWithValue(error);
		}
	},
);

export const deleteTeam = createAsyncThunk(
	'team/deleteTeam',
	async (projectAccessId, { rejectWithValue, dispatch, getState }) => {
		try {
			const slug = getState().project?.currentProject?.slug;
			const response = await deleteTeamRequest(projectAccessId, slug);
			dispatch(
				setMessageToast({
					type: 'success',
					message: i18nInstance.t(TEAM.USER_DELETED, { ns: DOMAIN_NAME }),
				}),
			);
			return response;
		} catch (error) {
			dispatch(
				setMessageToast({
					type: 'error',
					message: i18nInstance.t(TEAM.USER_NOT_DELETED, { ns: DOMAIN_NAME }),
				}),
			);
			return rejectWithValue(error);
		}
	},
);

const Team = createSlice({
	name: 'team',
	initialState,
	reducers: {
		setActiveModules: (state, { payload }) => {
			state.activeModules = payload;
		},
	},
	extraReducers: {
		[getTeam.pending]: (state) => {
			state.error = null;
		},
		[getTeam.rejected]: (state, { payload }) => {
			state.error = payload;
		},
		[getTeam.fulfilled]: (state, { payload }) => {
			state.arrayTeam = payload;
		},
		[postTeam.pending]: (state) => {
			state.error = null;
			state.response = false;
		},
		[postTeam.rejected]: (state, { payload }) => {
			state.error = payload;
		},
		[postTeam.fulfilled]: (state, { payload }) => {
			state.response = true;
			state.arrayTeam = payload;
		},
		[putTeam.pending]: (state) => {
			state.error = null;
			state.response = false;
		},
		[putTeam.rejected]: (state, { payload }) => {
			state.error = payload;
		},
		[putTeam.fulfilled]: (state, { payload }) => {
			state.response = true;
			state.arrayTeam = payload;
		},
		[deleteTeam.pending]: (state) => {
			state.error = null;
			state.response = false;
		},
		[deleteTeam.rejected]: (state, { payload }) => {
			state.error = payload;
		},
		[deleteTeam.fulfilled]: (state, { payload }) => {
			state.response = true;
			state.arrayTeam = payload;
		},
	},
});

export const { setActiveModules } = Team.actions;

export default Team.reducer;
