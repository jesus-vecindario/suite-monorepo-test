import { urlBase } from '../../../../shared/infrastructure/api/apiHandler';

export const fetchCommercialOpportunitiesBySlug = (slug = '') => `${urlBase}oportunidades-comerciales/${slug}`;
export const fetchInventoryReportBySlug = (slug = '') => `${urlBase}inventario/${slug}/reporte-tablero`;
