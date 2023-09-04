import { makeRequestFromServices } from './common-functions';
import { getProjectAddress } from '../../infrastructure/api/locations';

export const validateField = (value) => value !== '' || value !== null;

export const callGeoCodeApiFindByAddress = (address, fnCallBack, options = '') => {
	makeRequestFromServices(
		getProjectAddress(address, options),
		(res) => fnCallBack(res),
		(err) => fnCallBack(err),
	);
};

export const validLocation = (location) =>
	!Number.isNaN(parseFloat(location.lat)) && !Number.isNaN(parseFloat(location.lng));
