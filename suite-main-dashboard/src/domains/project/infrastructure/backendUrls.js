import { urlBase } from '../../../shared/infrastructure/api/apiHandler';

export const urlFetchProjectBySlug = (slug) => `${urlBase}proyectos/${slug}`;

export const urlUpdateProjectBySlug = (slug) => `${urlBase}proyectos/${slug}`;

export default {};
