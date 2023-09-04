import { createSelector } from '@reduxjs/toolkit';

export const customizationState = (state) => state.customization;

export const selectCustomizationColors = createSelector(customizationState, (custom) => {
	const { customizationColors } = custom;
	return customizationColors;
});
