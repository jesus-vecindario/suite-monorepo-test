import { errorMessages } from '@vecindario/suite-library';

export const EMPTY_FIELD = '*Debes diligenciar este campo para poder continuar';
export const INVALID_EMAIL_FORMAT = '*Correo electrónico invalido';
export const INVALID_URL_FORMAT = '*Formato de URL invalido, usa http://example.com/path';
export const INVALID_ARRAY = '*Debe seleccionar al menos una opción';
export const NO_LOAD_DATA =
	'No hemos podido cargar los datos requeridos, por favor recarga la pagina o intenta más tarde.';
export const ERROR_ON_REQUEST = 'La solicitud ha fallado';
export const SERVER_SIDE_ERROR = 'No hemos podido procesar tu solicitud, por favor intenta mas tarde.';
export const FAIL_LOADING_COMPONENT = 'Algo salio mal';

export const EMPTY_OPTION = 'Debe seleccionar una opción';
export const EMPTY_IMAGE_FIELD = 'Debe subir un logo';
export const INVALID_IMAGE_EXT = 'Formato inválido, formatos validos: jpg,gif,png.';
export const INVALID_LOCATION = 'La ubicación obtenida en el mapa es incorrecta';
export const min_characters = (value) => `Debe ser mínimo de ${value} caracteres.`;

export const { WRONG_TYPE } = errorMessages;
