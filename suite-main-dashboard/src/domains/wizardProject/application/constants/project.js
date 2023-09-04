export const OPTIONS_TYPE_PROJECT = [
	{ label: 'Comercial', value: 'commercial' },
	{ label: 'Residencial', value: 'residential' },
	{ label: 'Mixto', value: 'mixed' },
	{ label: 'Industrial', value: 'industrial' },
	{ label: 'Parcelación', value: 'parcelling' },
];

export const PROJECT_STATUS_OPTIONS = [
	{ label: 'Estructuración', value: 'structuring' },
	{ label: 'Sobre Planos', value: 'building' },
	{ label: 'Construcción', value: 'on_plans' },
	{ label: 'Entrega inmediata', value: 'immediate_delivery' },
];

export const projectFields = {
	NAME: 'title',
	TYPE: 'project_type',
	STATUS: 'project_status',
	LOGO: 'logo',
	ADDRESS: 'project_address',
	CITY: 'project_city',
	LOCATION: 'location',
	NEIGHBORHOOD: 'neighborhood',
	PROCESSING_OF_PERSONAL_DATA: 'processing_of_personal_data',
	DATA_AUTHORIZATION: 'data_authorization',
	TERMS_AND_CONDITIONS: 'terms_and_conditions',
};

export const INITIAL_LOCATION = { lat: 6.16, lng: -75.6 };

export const isInitialLocation = (location) =>
	INITIAL_LOCATION.lat === location.lat && INITIAL_LOCATION.lng === location.lng;

export default {};
