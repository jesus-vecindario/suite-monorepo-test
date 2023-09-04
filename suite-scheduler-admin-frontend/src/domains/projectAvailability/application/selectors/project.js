import { createSelector } from '@reduxjs/toolkit';
import { transformEditProject } from '../helpers/project';
import { defaultScheduleValues, projectFields } from '../constants/project';

export const projectAvailabilityState = (state) => state.projectAvailability;

export const getCurrentProject = createSelector(projectAvailabilityState, (_projectAvailabilityState) => {
	const { currentProject } = _projectAvailabilityState;
	return currentProject;
});

export const getProjectRequested = createSelector(projectAvailabilityState, (_projectAvailabilityState) => {
	const { projectRequested } = _projectAvailabilityState;
	return projectRequested;
});

export const getIsLoadedProject = createSelector(projectAvailabilityState, (_projectAvailabilityState) => {
	const { loadingGetProject } = _projectAvailabilityState;
	return !loadingGetProject;
});

export const getProjectAvailabilityToEdit = createSelector(projectAvailabilityState, (_projectAvailabilityState) => {
	const { currentProject } = _projectAvailabilityState;
	if (currentProject?.[projectFields.ATTENTION_DAYS] && currentProject?.[projectFields.SCHEDULING_TIME]) {
		const parsedData = transformEditProject(currentProject);
		return {
			[projectFields.ATTENTION_DAYS]: parsedData[projectFields.ATTENTION_DAYS],
			[projectFields.SCHEDULING_TIME]: parsedData[projectFields.SCHEDULING_TIME],
		};
	}
	return { [projectFields.ATTENTION_DAYS]: defaultScheduleValues };
});

export const getSchedulingTime = () =>
	createSelector(projectAvailabilityState, (_projectAvailabilityState) => {
		const { currentProject } = _projectAvailabilityState;
		return currentProject?.scheduling_time;
	});

export const getOpeningDays = () =>
	createSelector(projectAvailabilityState, (_projectAvailabilityState) => {
		const { currentProject } = _projectAvailabilityState;
		return currentProject?.attention_days;
	});

export const getClosingDays = () =>
	createSelector(projectAvailabilityState, (_projectAvailabilityState) => {
		const { currentProject } = _projectAvailabilityState;
		const attentionDays = currentProject?.attention_days;
		const closingDays = [];
		if (attentionDays) {
			for (let index = 1; index <= 7; index++) {
				if (!attentionDays[index]) {
					closingDays.push(index);
				}
			}
		}
		return closingDays;
	});

export const getAvailabilityOnDay = (day) =>
	createSelector(getOpeningDays(), (openingDays) => {
		return openingDays?.[day];
	});
