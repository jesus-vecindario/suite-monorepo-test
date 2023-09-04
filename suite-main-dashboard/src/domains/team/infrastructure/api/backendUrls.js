import { urlBase } from '../../../../shared/infrastructure/api/apiHandler';

export const urlGetTeam = (slug) => `${urlBase}proyectos/${slug}/mi-equipo`;
export const urlPostTeam = (slug) => `${urlBase}proyectos/${slug}/agregar-usuarios`;
export const urlPutTeam = (projectAccessId, slug) =>
	`${urlBase}proyectos/${slug}/accesos/${projectAccessId}/editar-usuario`;
export const urlDeleteTeam = (projectAccessId, slug) =>
	`${urlBase}proyectos/${slug}/accesos/${projectAccessId}/eliminar-usuario`;
