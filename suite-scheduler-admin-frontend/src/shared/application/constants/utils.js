export const emailRegex = /^([a-zA-Z0-9_.-]+)@([\da-zA-Z.-]+)\.([a-zA-Z.]{2,6})$/;
export const NAME_FORMAT = /^[a-zA-Z \u00C0-\u00FF]*$/;

export const WIZARD_CREATION_STEPS = {
	activation: 1,
	completion: 2,
	calendar: 3,
	availability: 4,
};

export const CREATION_ACCOUNT_FIELDS = {
	email: 'email',
	password: 'password',
	confirmation: 'password_confirmation',
};
