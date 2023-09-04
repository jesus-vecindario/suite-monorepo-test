import { createSelector } from '@reduxjs/toolkit';
import { teamState } from '../../../team/application/selector/team';

export const boardState = (state) => state.board;

export const getCommercialOpportunities = createSelector(boardState, (board) => {
	const { commercialOpportunities } = board;
	return commercialOpportunities;
});

export const getInventoryReport = createSelector(boardState, (board) => {
	const { inventoryReport } = board;
	return inventoryReport;
});

export const isLoadingCompleted = createSelector(boardState, (board) => {
	const { commercialOpportunities, inventoryReport } = board;
	return !!commercialOpportunities && !!inventoryReport;
});

export const getCheckListIsCompleted = createSelector(boardState, teamState, (board, state) => {
	return board?.inventoryReport?.towers && state?.arrayTeam.length > 1;
});
