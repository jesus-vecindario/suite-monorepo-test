import { authHeader, handleResponse } from '../../../../../shared/infrastructure/api/apiHandler';
import { urlGetCityList, urlGetLocation, urlGetNeighborhoodsByCity, urlGetSearchCities } from '../backendUrls';

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

export const getSearchCities = (search_text) => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};

	return fetch(urlGetSearchCities(search_text), requestOptions).then(handleResponse);
};
