import { createSelector } from '@reduxjs/toolkit';

export const dashboardState = (state) => state.dashboard;

export const getAppointmentsDashboard = createSelector(dashboardState, (dashboard) => dashboard?.appointments);
export const getSearchAppointmentsDashboard = createSelector(dashboardState, (dashboard) => dashboard?.searchResult);
export const getIsSearchingAppointments = createSelector(dashboardState, (dashboard) => dashboard?.isSearching);
export const appoinmentSearchLoading = createSelector(dashboardState, (dashboard = {}) => {
	const { searchLoading } = dashboard;
	return searchLoading;
});
