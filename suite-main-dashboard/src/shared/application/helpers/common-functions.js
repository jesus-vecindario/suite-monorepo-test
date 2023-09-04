import { helpers, language } from '@vecindario/suite-library';

export const rgba2hex = (rgbaString) => {
	if (rgbaString === null || rgbaString === undefined) return { r: 255, g: 255, b: 255, a: 255 };

	const rgbaRegex = /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)$/i;
	const match = rgbaString.match(rgbaRegex);

	if (!match) {
		throw new Error('Formato RGBA inválido');
	}

	const red = parseInt(match[1]);
	const green = parseInt(match[2]);
	const blue = parseInt(match[3]);
	const alpha = parseFloat(match[4]);

	return { r: red, g: green, b: blue, a: alpha };
};

export const {
	importResource,
	checkCookieExistence,
	getFirstWord,
	capitalize,
	createSuiteCookie,
	makeRequestFromServices,
	differencesBetweenObjects,
	checkIfImageExists,
	debounce,
	importDynamic,
	setValueToLocalStorage,
	getValueFromLocalStorage,
	removeValueFromLocalStorage,
	isEmptyObject,
	removeEmptyFields,
} = helpers.commonFunctions;

export const { LOCALES, getConfigI18n } = language;
