export const TOAST_STATUS = {
	SUCCESS: 'success',
	ERROR: 'error',
	WARNING: 'warning',
};

export const successToast = (message, haveIcon = true) => {
	return {
		type: TOAST_STATUS.SUCCESS,
		message,
		haveIcon,
	};
};

export const warningToast = (message, haveIcon = false) => {
	return {
		type: TOAST_STATUS.WARNING,
		message,
		haveIcon,
	};
};

export const errorToast = (message, haveIcon = false) => {
	return {
		type: TOAST_STATUS.ERROR,
		message,
		haveIcon,
	};
};
