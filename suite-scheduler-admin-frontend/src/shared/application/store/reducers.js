import { combineReducers } from 'redux';
import { slices } from '@vecindario/suite-dashboard-layout-lib';
import core, { initialState as coreInitial } from '../slices/core';
import myProfile, { initialState as myProfileInitial } from '../slices/myProfile';
import socialLogin, {
	initialState as socialInitial,
} from '../../../domains/authentication/application/slice/socialLogin';
import projectAvailability, {
	initialState as projectAvailabilityInitial,
} from '../../../domains/projectAvailability/application/slices/project';
import appointment from '../slices/appointment';
import appointmentList, { initialState as appointmentListInitial } from '../slices/appointmentList';
import dashboard, { initialState as myDashboardInitial } from '../../../domains/dashboard/application/slice/dashboard';

export const reducers = {
	...slices,
	projectAvailability,
	core,
	appointment,
	appointmentList,
	myProfile,
	socialLogin,
	dashboard,
};

export const initialStates = {
	core: coreInitial,
	projectAvailability: projectAvailabilityInitial,
	appointmentList: appointmentListInitial,
	social: socialInitial,
	myProfile: myProfileInitial,
	dashboard: myDashboardInitial,
};

export default combineReducers(reducers);
