import { createSelector } from '@reduxjs/toolkit';

export const locationsState = (state) => state?.locations;

export const getCitiesList = createSelector(locationsState, (locations) => {
	return locations?.cities;
});
