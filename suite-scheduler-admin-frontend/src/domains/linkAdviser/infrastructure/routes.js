import { SCHEDULE_ASESOR_EMAIL } from '../../../shared/application/constants/queryParams';

export const adviserLinkAppointment = (slug = ':slug', adviserEmail = null) => {
	let route = `/proyecto/${slug}/agendar`;
	if (adviserEmail) {
		route += `?${SCHEDULE_ASESOR_EMAIL}=${adviserEmail}`;
	}
	return route;
};

export const oldAdviserLinkAppointment = (slug = ':slug', adviserEmail = null) => {
	let route = `/vista-previa/${slug}/agendar`;
	if (adviserEmail) {
		route += `?${SCHEDULE_ASESOR_EMAIL}=${adviserEmail}`;
	}
	return route;
};

export default {};
