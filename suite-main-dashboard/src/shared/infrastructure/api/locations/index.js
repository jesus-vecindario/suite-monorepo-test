import { authHeader, handleResponse } from '../apiHandler';
import { urlGetCityList, urlGetLocation, urlGetNeighborhoodsByCity } from './backendUrls';

export const getListCities = () => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};

	return fetch(urlGetCityList, requestOptions).then(handleResponse);
};

export const getNegihtborhoodsByCity = (cityID) => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};

	return fetch(urlGetNeighborhoodsByCity(cityID), requestOptions).then(handleResponse);
};

export const getProjectAddress = (address) => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};
	return fetch(urlGetLocation(address), requestOptions).then(handleResponse);
};
