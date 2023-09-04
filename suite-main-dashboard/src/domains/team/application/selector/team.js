import { createSelector } from '@reduxjs/toolkit';

export const teamState = (state) => state.team;

export const getArrayTeam = createSelector(teamState, (team) => {
	return team?.arrayTeam;
});

export const getPrincipalDirector = createSelector(teamState, (team = {}) => {
	return team?.arrayTeam.find((user) => user['is_principal_director?'] && user['is_project_creator?']);
});
