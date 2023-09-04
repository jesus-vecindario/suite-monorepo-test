export const userDetailFields = {
	FIRST_NAME: 'name',
	LAST_NAME: 'lastname',
	MOBILE: 'mobile',
	AVATAR: 'avatar',
	TIME_AVAILABILITY: 'time_availabilities',
	CONTACT_LINK: 'contact_link',
	EMAIL: 'email',
	APPOINTMENT_TYPES: 'appointment_type',
};

export const changePasswordFields = {
	CURRENT_PASSWORD: 'actual_password',
	NEW_PASSWORD: 'new_password',
	CONFIRMATION_NEW_PASSWORD: 'confirmation_new_password',
};

export const APPOINTMENT_TYPE_VALUES = {
	VISIT: 'visit',
	VIDEO_CALL: 'video_call',
	BOTH: 'both',
};

export const APPOINTMENT_TYPES_PERMISSIONS = {
	[APPOINTMENT_TYPE_VALUES.VISIT]: { appointment_type: [APPOINTMENT_TYPE_VALUES.VISIT] },
	[APPOINTMENT_TYPE_VALUES.VIDEO_CALL]: { appointment_type: [APPOINTMENT_TYPE_VALUES.VIDEO_CALL] },
	[APPOINTMENT_TYPE_VALUES.BOTH]: {
		appointment_type: [APPOINTMENT_TYPE_VALUES.VIDEO_CALL, APPOINTMENT_TYPE_VALUES.VISIT],
	},
};

export const APPOINTMENT_TYPES = [
	{ value: APPOINTMENT_TYPE_VALUES.BOTH, label: 'Deseo agendamientos digitales y fisicos' },
	{ value: APPOINTMENT_TYPE_VALUES.VIDEO_CALL, label: 'Deseo solo agendamientos digitales' },
	{ value: APPOINTMENT_TYPE_VALUES.VISIT, label: 'Deseo solo agendamientos fisicos' },
];
