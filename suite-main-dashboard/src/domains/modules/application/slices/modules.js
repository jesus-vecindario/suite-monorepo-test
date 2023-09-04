import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getModulesByProjectFetch } from '@vecindario/suite-dashboard-layout-lib';
import { getActiveModules as getActiveModulesService, getModulesRequest, postToggleActive } from '../../infrastructure';

export const initialState = {
	activeModules: [],
	modules: [],
	error: null,
	isLoading: false,
	currentProject: null,
	projectRequested: false,
};

export const getActiveModules = createAsyncThunk('modules/getActiveModules', async (slug, { rejectWithValue }) => {
	try {
		const response = await getActiveModulesService(slug);
		return response;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const toggleActiveModule = createAsyncThunk(
	'project/toggleActiveModule',
	async (data, { rejectWithValue, dispatch }) => {
		try {
			const response = await postToggleActive(data.slug, data.moduleId);
			dispatch(getModulesByProjectFetch(data.slug));
			return response;
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

export const getModulesFetch = createAsyncThunk('modules/getModulesFetch', async (_, { rejectWithValue }) => {
	try {
		return await getModulesRequest();
	} catch (error) {
		return rejectWithValue(error);
	}
});

const Modules = createSlice({
	name: 'modules',
	initialState,
	reducers: {
		setActiveModules: (state, { payload }) => {
			state.activeModules = payload;
		},
	},
	extraReducers: {
		[getModulesFetch.pending]: (state) => {
			state.error = null;
		},
		[getModulesFetch.rejected]: (state, { payload }) => {
			state.error = payload;
		},
		[getModulesFetch.fulfilled]: (state, { payload }) => {
			state.modules = payload;
		},
		[getActiveModules.pending]: (state) => {
			state.error = null;
		},
		[getActiveModules.rejected]: (state, { payload }) => {
			state.error = payload;
		},
		[getActiveModules.fulfilled]: (state, { payload }) => {
			state.activeModules = payload;
		},
		[toggleActiveModule.pending]: (state) => {
			state.error = null;
		},
		[toggleActiveModule.rejected]: (state, { payload }) => {
			state.error = payload;
		},
		[toggleActiveModule.fulfilled]: (state, { payload }) => {
			state.activeModules = payload;
		},
	},
});

export const { setActiveModules } = Modules.actions;

export default Modules.reducer;
