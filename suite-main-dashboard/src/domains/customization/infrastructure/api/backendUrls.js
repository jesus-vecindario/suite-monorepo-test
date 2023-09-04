import { urlBase } from '../../../../shared/infrastructure/api/apiHandler';

export const fetchCustomTheme = (slug = ':slug') => `${urlBase}proyectos/${slug}/obtener-tema-personalizado`;
export const fetchCreateCustomization = (slug = '') => `${urlBase}proyectos/${slug}/crear-tema-personalizado`;
export const fetchUpdateCustomization = (slug = '') => `${urlBase}proyectos/${slug}/actualizar-tema-personalizado`;
