import { createSelector } from '@reduxjs/toolkit';

export const coreState = (state) => state.core;

export const getSchedulerPermissions = createSelector(coreState, (core = {}) => {
	const { permissions } = core;
	return permissions?.permissions;
});

export const getNavbarTitle = createSelector(coreState, (core) => core.navbarTitle);

export const getHideNavbar = createSelector(coreState, (core) => core.hideNavbar);

export const getToast = createSelector(coreState, (core) => core.toast);

export const getAdviserTourShowed = createSelector(coreState, (core) => core.tour.adviserTourShowed);

export const getDirectorTourShowed = createSelector(coreState, (core) => core.tour.directorTourShowed);
