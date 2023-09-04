export const homeRoute = '/';

// ADMIN
export const projectMetricsRoute = (slug = ':slug') => `/proyectos/${slug}/metricas`;
export const projectListRoute = '/proyectos';
export const userListRoute = (slug = ':slug') => `/proyectos/${slug}/usuarios`;
export const businessListRoute = (slug = ':slug') => `/proyectos/${slug}/negocios`;
export const userCompradorProfileRoute = (slug = ':slug', businessId = ':businessId') =>
	`/proyectos/${slug}/negocios/${businessId}/usuario`;
export const adminUserProfileRoute = '/perfil';
export const superAdminUserListRoute = '/usuarios';

// REPORTS
export const reportBaseRoute = '/reportes';
export const offerSearchReportRoute = `${reportBaseRoute}/oferta/reporte-de-busqueda`;
export const offerLocationReportRoute = `${reportBaseRoute}/oferta/reporte-por-ubicacion`;
