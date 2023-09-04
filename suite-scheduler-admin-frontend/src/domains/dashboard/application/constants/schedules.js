import moment from 'moment';
import {
	ICON_CANCELED_SCHEDULERS,
	ICON_DONE_SCHEDULERS,
	ICON_NOT_ATTENDED_SCHEDULERS,
	ICON_PENDING_SCHEDULERS,
	ICON_RESCHEDULE_SCHEDULERS,
} from '../../../../shared/application/constants/icons';
import { isSameDay } from '../../../../shared/application/helpers/date';

export const SCHEDULE_STATUS = {
	DONE: 'done',
	PENDING: 'pending',
	CANCELLED: 'cancelled',
	RESCHEDULED: 'rescheduled',
	NOT_ATTENDED: 'not_attended',
};

export const APPOINTMENT_OPTIONS = [
	{
		key: 'visit',
		value: 'Física',
	},
	{
		key: 'video_call',
		value: 'Digital',
	},
];

export const APPOINTMENT_STATES = [
	{
		key: SCHEDULE_STATUS.DONE,
		value: 'Realizada',
		color: 'green',
		withValidation: true,
		validation: (date) => moment(date).isBefore(moment(), 'day') || isSameDay(date),
	},
	{
		key: SCHEDULE_STATUS.NOT_ATTENDED,
		value: 'No asistió',
		color: 'gray',
		withValidation: true,
		validation: (date) => moment(date).isSameOrBefore(moment(), 'second'),
	},
	{
		key: SCHEDULE_STATUS.PENDING,
		value: 'Pendiente',
		color: 'yellow',
		withValidation: false,
	},
	{
		key: SCHEDULE_STATUS.CANCELLED,
		value: 'Cancelada',
		color: 'red',
		withValidation: false,
	},
	{
		key: SCHEDULE_STATUS.RESCHEDULED,
		value: 'Reagendada',
		color: 'pink',
		withValidation: true,
		validation: (date) => moment(date).isAfter(moment(), 'day') || isSameDay(date),
	},
];

export const SCHEDULES_DATA = [
	{
		key: SCHEDULE_STATUS.DONE,
		title: 'Realizadas',
		icon: ICON_DONE_SCHEDULERS,
		color: 'done-color',
	},
	{
		key: SCHEDULE_STATUS.PENDING,
		title: 'Pendientes',
		icon: ICON_PENDING_SCHEDULERS,
		color: 'pending-color',
	},
	{
		key: SCHEDULE_STATUS.RESCHEDULED,
		title: 'Reagendadas',
		icon: ICON_RESCHEDULE_SCHEDULERS,
		color: 'rescheduled-color',
	},
	{
		key: SCHEDULE_STATUS.CANCELLED,
		title: 'Canceladas',
		icon: ICON_CANCELED_SCHEDULERS,
		color: 'cancelled-color',
	},
	{
		key: SCHEDULE_STATUS.NOT_ATTENDED,
		title: 'El usuario no asistió',
		icon: ICON_NOT_ATTENDED_SCHEDULERS,
		color: 'not-attended-color',
	},
];
