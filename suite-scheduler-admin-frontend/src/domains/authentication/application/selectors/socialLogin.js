import { createSelector } from '@reduxjs/toolkit';

export const socialLoginState = (state) => state.socialLogin;

export const socialLoginLoading = createSelector(socialLoginState, (socialLogin = {}) => {
	const { loading } = socialLogin;
	return loading;
});

export const socialLoginError = createSelector(socialLoginState, (socialLogin = {}) => {
	const { error } = socialLogin;
	return error;
});
