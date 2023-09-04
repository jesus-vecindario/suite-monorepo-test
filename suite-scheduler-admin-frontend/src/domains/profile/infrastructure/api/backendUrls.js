// PROFILE
import { urlBase } from '../../../../shared/infrastructure/api/backendUrls';

export const urlSynchronizeStatus = (slug) => `${urlBase}asesor/${slug}/disponibilidad`;
export const urlSyncCalendar = `${urlBase}sincronizar-calendario`;
export const urlMyTimeAvailability = (slug) => `${urlBase}asesor/${slug}/disponibilidad`;
