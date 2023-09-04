export const configurationRoute = (slug = ':slug') => `/bienvenido/${slug}/configuracion`;
export const trackingRoute = (slug = ':slug') => `${configurationRoute(slug)}/analitica`;
