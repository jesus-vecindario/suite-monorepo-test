import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getListCities } from '../../infrastructure/api/locations';

export const initialState = {
	cities: [],
};

export const getFetchCities = createAsyncThunk('locations/getFetchCities', async (slug, { rejectWithValue }) => {
	try {
		const citiesList = await getListCities();
		return citiesList;
	} catch (error) {
		return rejectWithValue(error);
	}
});

const Project = createSlice({
	name: 'locations',
	initialState,
	reducers: {
		setCitiesList: (state, action) => {
			state.cities = action.payload;
		},
	},
	extraReducers: {
		[getFetchCities.pending]: (state) => {
			state.loading = true;
			state.requested = false;
		},
		[getFetchCities.rejected]: (state, { payload }) => {
			state.loading = false;
			state.requested = true;
			state.error = payload;
		},
		[getFetchCities.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.error = '';
			state.cities = payload;
			state.requested = true;
		},
	},
});

export const { setCitiesList } = Project.actions;

export default Project.reducer;
