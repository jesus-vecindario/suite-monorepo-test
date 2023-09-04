import { combineReducers } from 'redux';
import { slices } from '@vecindario/suite-dashboard-layout-lib';

import modules from '../../../domains/modules/application/slices/modules';
import team from '../../../domains/team/application/slices/team';
import locations from '../slices/locations';
import board from '../../../domains/board/application/slices/board';
import customization from '../../../domains/customization/application/slices/customization';

export default combineReducers({
	...slices,
	modules,
	team,
	locations,
	board,
	customization,
});
