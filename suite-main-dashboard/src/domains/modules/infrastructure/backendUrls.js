import { urlBase } from '../../../shared/infrastructure/api/apiHandler';

export const urlGetActiveModules = (slug = ':slug') => `${urlBase}lista-de-modulos-por-proyecto/${slug}`;
export const urlGetModules = `${urlBase}modulos`;
export const urlToggleModules = (slug = ':slug') => `${urlBase}modulos-por-proyecto/${slug}/toggle`;
