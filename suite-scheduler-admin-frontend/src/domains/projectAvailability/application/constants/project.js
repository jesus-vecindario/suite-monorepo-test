import { TIME_ICON } from './icons';

export const PROJECT_SCHEDULE_TIME_OPTIONS = [
	{ value: '15', label: '15 minutos', icon: TIME_ICON },
	{ value: '30', label: '30 minutos', icon: TIME_ICON },
	{ value: '45', label: '45 minutos', icon: TIME_ICON },
	{ value: '60', label: '60 minutos', icon: TIME_ICON },
];

export const projectFields = {
	SCHEDULING_TIME: 'scheduling_time',
	ATTENTION_DAYS: 'attention_days',
};

export const SUPER_ADMIN_ROLE = 'admin';
export const ASESOR_ROLE = 'asesor';
export const DIRECTOR_ROLE = 'director';

export const defaultScheduleValues = {
	d1: {
		isRestDay: true,
		hourStart: null,
		hourEnd: null,
	},
	d2: {
		isRestDay: true,
		hourStart: null,
		hourEnd: null,
	},
	d3: {
		isRestDay: true,
		hourStart: null,
		hourEnd: null,
	},
	d4: {
		isRestDay: true,
		hourStart: null,
		hourEnd: null,
	},
	d5: {
		isRestDay: true,
		hourStart: null,
		hourEnd: null,
	},
	d6: {
		isRestDay: true,
		hourStart: null,
		hourEnd: null,
	},
	d7: {
		isRestDay: true,
		hourStart: null,
		hourEnd: null,
	},
};

export const isNewProject = (data) => Object.keys(data).length === 1;
