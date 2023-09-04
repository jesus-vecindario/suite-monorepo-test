import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFetchCommercialOpportunitiesBySlug, getFetchInventoryReportBySlug } from '../../infrastructure/api';

const initialState = {
	commercialOpportunities: null,
	inventoryReport: {},
};

export const getCommercialOpportunitiesBySlug = createAsyncThunk(
	'board/getCommercialOpportunities',
	async (slug, { rejectWithValue }) => {
		try {
			return await getFetchCommercialOpportunitiesBySlug(slug);
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

export const getInventoryReportBySlug = createAsyncThunk(
	'board/getInventoryReport',
	async (slug, { rejectWithValue }) => {
		try {
			return await getFetchInventoryReportBySlug(slug);
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

const Board = createSlice({
	name: 'board',
	initialState,
	extraReducers: {
		[getCommercialOpportunitiesBySlug.fulfilled]: (state, { payload }) => {
			state.commercialOpportunities = payload;
		},
		[getInventoryReportBySlug.fulfilled]: (state, { payload }) => {
			state.inventoryReport = payload;
		},
	},
});

export default Board.reducer;
