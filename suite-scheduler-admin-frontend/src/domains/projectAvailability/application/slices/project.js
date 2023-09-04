import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProjectAvailability } from '../../infrastructure/api';
import { checkCookieExistence } from '../../../../shared/application/helpers/common-functions';
import { LAST_SELECTED_SLUG } from '../../../../shared/application/constants/cookiesKeys';

export const initialState = {
	currentProject: null,
	error: null,
	projectRequested: false,
	loadingGetProject: false,
};

export const getProjectBySlug = createAsyncThunk(
	'projectAvailability/getProjectBySlug',
	async (_, { rejectWithValue, getState }) => {
		try {
			const { currentProject } = getState().project;
			const slug = currentProject?.slug || checkCookieExistence(LAST_SELECTED_SLUG);
			return await getProjectAvailability(slug);
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

const ProjectAvailability = createSlice({
	name: 'projectAvailability',
	initialState,
	reducers: {
		setCurrentProject(state, { payload }) {
			state.currentProject = payload;
		},
		updateProject(state, { payload }) {
			state.currentProject = { ...state.currentProject, ...payload };
		},
	},
	extraReducers: {
		[getProjectBySlug.pending]: (state) => {
			state.loadingGetProject = true;
		},
		[getProjectBySlug.rejected]: (state, { payload }) => {
			state.loadingGetProject = false;
			state.projectRequested = true;
			state.error = payload;
			state.currentProject = {};
		},
		[getProjectBySlug.fulfilled]: (state, { payload }) => {
			state.loadingGetProject = false;
			state.error = '';
			state.currentProject = payload || {};
			state.projectRequested = true;
		},
	},
});

export const { setCurrentProject, updateProject } = ProjectAvailability.actions;

export default ProjectAvailability.reducer;
