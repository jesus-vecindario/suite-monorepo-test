import { urlBase } from '../../../../shared/infrastructure/api/backendUrls';

export const urlGetProject = (slug = ':slug') => `${urlBase}proyectos/${slug}`;
export const urlGetProjects = `${urlBase}proyectos`;
export const urlCreateProject = `${urlBase}proyectos/crear`;
export const urlFetchProjectBySlug = (slug) => `${urlBase}proyectos/${slug}`;
export const urlEditProject = (slug) => `${urlBase}proyectos/${slug}`;
export const urlToggleActiveProject = (slug) => `${urlBase}proyectos/${slug}/cambiar-activo`;
