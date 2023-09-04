import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFetchCustomTheme } from '../../infrastructure/api';

const initialState = {
	customizationColors: {},
};

export const requestGetCustomizationBySlug = createAsyncThunk(
	'customization/requestGetCustomizationBySlug',
	async (slug, { rejectWithValue }) => {
		try {
			return await getFetchCustomTheme(slug);
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

const Customization = createSlice({
	name: 'customization',
	initialState,
	reducers: {
		setCustomizationColors: (state, { payload }) => {
			state.customizationColors = { ...state.customizationColors, [payload?.key]: payload?.newStyle };
		},
	},
	extraReducers: {
		[requestGetCustomizationBySlug.fulfilled]: (state, { payload }) => {
			state.customizationColors = payload;
		},
	},
});

export const { setCustomizationColors } = Customization.actions;

export default Customization.reducer;
