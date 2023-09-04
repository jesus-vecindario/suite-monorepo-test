import { urlBase } from '../../../../shared/infrastructure/api/apiHandler';

export const urlPatchTrackingConfiguration = (slug = ':slug') => `${urlBase}proyectos/${slug}/configuracion-analitica`;

export default { urlPatchTrackingConfiguration };
