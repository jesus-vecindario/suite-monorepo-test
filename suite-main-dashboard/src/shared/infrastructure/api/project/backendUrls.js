import { urlBase } from '../apiHandler';

export const urlGetProjects = `${urlBase}proyectos`;
export const urlGetModulesByProject = (slug) => `${urlBase}modulos-por-projecto/${slug}`;
