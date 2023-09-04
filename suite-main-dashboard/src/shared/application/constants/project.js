import { DOMAIN_NAME } from '../../infrastructure/i18n/locales';
import { FORM_PROJECT } from '../../infrastructure/i18n/locales/translation_keys';
import {
	LOGO_BUSINESS_OPPORTUNITIES,
	LOGO_LANDING_MODULE,
	LOGO_SCHEDULER_MODULE,
	LOGO_SIMULATOR_MODULE,
} from './icons';

export const ASESOR_ROLE = 'asesor';
export const DIRECTOR_ROLE = 'director';

export const SUITE_MODULES = {
	SIMULATOR_MODULE: 'gestor_de_inventarios',
	SCHEDULER_MODULE: 'agendador',
	LANDING_BUILDER_MODULE: 'landing_builder',
	BUSINESS_OPPORTUNITIES: 'oportunidades_de_negocio',
};

export const DROPDOWN_ICONS = {
	[SUITE_MODULES.SIMULATOR_MODULE]: LOGO_SIMULATOR_MODULE,
	[SUITE_MODULES.SCHEDULER_MODULE]: LOGO_SCHEDULER_MODULE,
	[SUITE_MODULES.LANDING_BUILDER_MODULE]: LOGO_LANDING_MODULE,
	[SUITE_MODULES.BUSINESS_OPPORTUNITIES]: LOGO_BUSINESS_OPPORTUNITIES,
};

export const PROJECT_TYPE_OPTIONS = (t) => [
	{ label: t(FORM_PROJECT.TYPE_OPTIONS_COMMERCIAL, { ns: DOMAIN_NAME }), value: 'commercial' },
	{ label: t(FORM_PROJECT.TYPE_OPTIONS_RESIDENTIAL, { ns: DOMAIN_NAME }), value: 'residential' },
	{ label: t(FORM_PROJECT.TYPE_OPTIONS_MIXED, { ns: DOMAIN_NAME }), value: 'mixed' },
	{ label: t(FORM_PROJECT.TYPE_OPTIONS_INDUSTRIAL, { ns: DOMAIN_NAME }), value: 'industrial' },
	{ label: t(FORM_PROJECT.TYPE_OPTIONS_PARCELLING, { ns: DOMAIN_NAME }), value: 'parcelling' },
];

export const PROJECT_STATUS_OPTIONS = (t) => [
	{ label: t(FORM_PROJECT.STATUS_OPTIONS_STRUCTURING, { ns: DOMAIN_NAME }), value: 'structuring' },
	{ label: t(FORM_PROJECT.STATUS_OPTIONS_ON_PLANS, { ns: DOMAIN_NAME }), value: 'on_plans' },
	{ label: t(FORM_PROJECT.STATUS_OPTIONS_BUILDING, { ns: DOMAIN_NAME }), value: 'building' },
	{ label: t(FORM_PROJECT.STATUS_OPTIONS_IMMEDIATE_DELIVERY, { ns: DOMAIN_NAME }), value: 'immediate_delivery' },
];

export const INTERNATIONALIZATION_CONFIG_FIELD = 'internationalization_config';
export const projectFields = Object.freeze({
	NAME: 'title',
	TYPE: 'project_type',
	COMPANY: 'company_name',
	STATUS: 'project_status',
	SCHEDULING_TIME: 'scheduling_time',
	ATTENTION_DAYS: 'attention_days',
	LOGO: 'logo',
	ADDRESS: 'project_address',
	CITY: 'city',
	LOCATION: 'location',
	NEIGHBORHOOD: 'neighborhood',
	PROCESSING_OF_PERSONAL_DATA: 'processing_of_personal_data',
	DATA_AUTHORIZATION: 'data_authorization',
	TERMS_AND_CONDITIONS: 'terms_and_conditions',
	CURRENCY: 'currency',
	UNIT_OF_MEASUREMENT: 'unit_of_measurement',
	LANGUAGE: 'language',
});

export const projectHelpTexts = {
	NAME: 'Deberás indicar como se llama el proyecto que vas a crear. Ejemplo: Torres del Bosque.',
	COMPANY: 'Acá deberás indicar el nombre que la compañía a la que pertenece el proyecto. Ejemplo: Vecindario',
	CITY: 'Selecciona la ciudad donde se encuentra el proyecto',
	ADDRESS: 'Indica la nomenclatura donde se encuentra el proyecto',
	NEIGHBORHOOD: 'Deberás indicar el nombre del barrio en el que se encuentra el proyecto',
	TYPE:
		'Acá deberás indicar lo que mejor describe a tu proyecto inmobiliario, solo puedes seleccionar una. Ejemplo: Residencial',
	STATUS:
		'Acá deberás indicar lo que mejor describe a tu proyecto inmobiliario, en estructuración se usa cuando apenas va a salir al mercado, por lo general todas las ventas se dan en la etapa de sobre planos. Ejemplo: Sobre Planos.',
	DATA_AUTHORIZATION:
		'Acá deberás agregar la URL donde se encuentra la autorización de tratamiento de datos personales de tu compañía, ejemplo: https://www.constructora.com/autorizacion-tratamiento-datos',
	TERMS_AND_CONDITIONS:
		'Acá deberás agregar la URL donde se encuentran los términos y condiciones de tu compañía, ejemplo: https://www.constructora.com/terminos-y-condiciones',
	PROCESSING_OF_PERSONAL_DATA:
		'Acá deberás agregar la URL donde se encuentra la política de tratamiento de datos de tu compañía, ejemplo: https://www.constructora.com/PoliticaDatos',
	LOGO:
		'Sube el logo de tu proyecto inmobiliario sobre un fondo blanco y en un tamaño superior a 250 x 250 píxeles, el formato ideal es JPG.',
	LANGUAGE:
		'Este idioma será el predeterminado para correos, notificaciones, alertas y otras comunicaciones con el equipo y usuarios interesado en el proyecto',
};

export const INITIAL_LOCATION = { lat: 6.16, lng: -75.6 };

export const isInitialLocation = (location) =>
	INITIAL_LOCATION.lat === location.lat && INITIAL_LOCATION.lng === location.lng;

export const URL_FORMAT_REGEX =
	/(http(s?)):\/\/?(www\.)?[a-z0-9]+(-[a-z0-9]+)?(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-_]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

export const CURRENCY_OPTIONS = (t) =>
	Object.freeze([
		{ label: t(FORM_PROJECT.CURRENCY_OPTIONS_COP, { ns: DOMAIN_NAME }), value: 'COP' },
		{ label: t(FORM_PROJECT.CURRENCY_OPTIONS_USD, { ns: DOMAIN_NAME }), value: 'USD' },
		{ label: t(FORM_PROJECT.CURRENCY_OPTIONS_EUR, { ns: DOMAIN_NAME }), value: 'EUR' },
		{ label: t(FORM_PROJECT.CURRENCY_OPTIONS_ARS, { ns: DOMAIN_NAME }), value: 'ARS' },
		{ label: t(FORM_PROJECT.CURRENCY_OPTIONS_CLP, { ns: DOMAIN_NAME }), value: 'CLP' },
		{ label: t(FORM_PROJECT.CURRENCY_OPTIONS_MXN, { ns: DOMAIN_NAME }), value: 'MXN' },
		{ label: t(FORM_PROJECT.CURRENCY_OPTIONS_BRL, { ns: DOMAIN_NAME }), value: 'BRL' },
		{ label: t(FORM_PROJECT.CURRENCY_OPTIONS_DOP, { ns: DOMAIN_NAME }), value: 'DOP' },
		{ label: t(FORM_PROJECT.CURRENCY_OPTIONS_PAB, { ns: DOMAIN_NAME }), value: 'PAB' },
		{ label: t(FORM_PROJECT.CURRENCY_OPTIONS_GTQ, { ns: DOMAIN_NAME }), value: 'GTQ' },
	]);

export const UNIT_OF_MEASUREMENT_OPTIONS = (t) =>
	Object.freeze([
		{ label: t(FORM_PROJECT.UNIT_OF_MEASUREMENT_OPTIONS_MT, { ns: DOMAIN_NAME }), value: 'mt' },
		{ label: t(FORM_PROJECT.UNIT_OF_MEASUREMENT_OPTIONS_FEET, { ns: DOMAIN_NAME }), value: 'feet' },
	]);

export const LANGUAGE_OPTIONS = (t) =>
	Object.freeze([
		{ label: t(FORM_PROJECT.LANGUAGE_OPTIONS_ES, { ns: DOMAIN_NAME }), value: 'es' },
		{ label: t(FORM_PROJECT.LANGUAGE_OPTIONS_EN, { ns: DOMAIN_NAME }), value: 'en' },
	]);
