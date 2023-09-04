import { fetchCommercialOpportunitiesBySlug, fetchInventoryReportBySlug } from './backendUrls';
import { authHeader, handleResponse } from '../../../../shared/infrastructure/api/apiHandler';

export const getFetchCommercialOpportunitiesBySlug = (slug) => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};
	return fetch(fetchCommercialOpportunitiesBySlug(slug), requestOptions).then(handleResponse);
};

export const getFetchInventoryReportBySlug = (slug) => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};
	return fetch(fetchInventoryReportBySlug(slug), requestOptions).then(handleResponse);
};
