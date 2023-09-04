import moment from 'moment';

export const checkIntervalDispatch =
	(dispatch, thunkRequest, lastCall, checkTime = 50) =>
	(...thunkArgs) =>
	() => {
		if (!lastCall || moment().diff(lastCall, 'S') >= checkTime) {
			dispatch(thunkRequest(...thunkArgs));
		}
	};

export default checkIntervalDispatch;
