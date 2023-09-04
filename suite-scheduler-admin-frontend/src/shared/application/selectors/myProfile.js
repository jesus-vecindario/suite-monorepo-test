import { createSelector } from '@reduxjs/toolkit';

export const myProfileState = (state) => state.myProfile;

export const getMyUserTimeAvailability = createSelector(myProfileState, (myProfile) => {
	const { user_time_availability } = myProfile.profile;
	return user_time_availability;
});

export const getUserUnavailableDays = createSelector(getMyUserTimeAvailability, (availability = {}) => {
	const closingDays = [];
	const { attention_days: attentionDays } = availability;
	if (attentionDays) {
		for (let index = 1; index <= 7; index++) {
			if (!attentionDays[index]) {
				if (index === 7) {
					closingDays.push(0);
				} else {
					closingDays.push(index);
				}
			}
		}
	}
	return closingDays;
});

export const getMyCalendarAccount = createSelector(myProfileState, (myProfile) => {
	const { calendar_account } = myProfile.profile;
	return calendar_account;
});

export const getHasCalendar = createSelector(myProfileState, (myProfile) => {
	const { hasCalendar } = myProfile.profile;
	return hasCalendar;
});

export const selectLoading = createSelector(myProfileState, (myProfile) => myProfile.loading);
