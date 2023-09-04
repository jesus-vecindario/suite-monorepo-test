import { urlBase } from '../../../../shared/infrastructure/api/backendUrls';

export const urlGetAppointments = `${urlBase}agendamientos`;
export const urlUpdateAppointmentState = (id = ':id') => `${urlBase}agendamientos/${id}/cambiar-estado`;
export const urlUpdateAppointmentType = (id = ':id') => `${urlBase}agendamientos/${id}/cambiar-tipo`;
export const urlFetchSchedulerPermissions = (slug = 'project_slug') => `${urlBase}proyectos/${slug}/permisos`;
