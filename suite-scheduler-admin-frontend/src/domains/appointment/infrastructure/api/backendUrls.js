// APPOINTMENT
import { urlBase } from '../../../../shared/infrastructure/api/backendUrls';

export const urlAppointmentStats = (slug) => `${urlBase}agendamientos/estadisticas${slug ? `?slug=${slug}` : ''}`;
export const urlPostMakeAppointment = (slug = ':slug') => `${urlBase}proyectos/${slug}/agendar-visita/por-asesor`;
export const urlGetAvailabilityOnDay = (
	slug = ':slug',
	day = ':day',
	adviserEmail = ':asesor_email',
	appointmentType,
) =>
	`${urlBase}proyectos/${slug}/obtener-disponibilidad-calendarios/dia/${day}?asesor_email=${adviserEmail}&appointment_type=${appointmentType}`;
export const urlNextAppointments = (limitHours) =>
	`${urlBase}agendamientos/proximos${limitHours ? `?max_hours=${limitHours}` : ''}`;
export const urlLastAppointments = `${urlBase}agendamientos/ultimos`;
