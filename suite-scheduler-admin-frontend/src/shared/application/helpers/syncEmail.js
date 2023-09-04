import { GOOGLE_CLIENT_ID, MICROSOFT_CLIENT_ID } from '../constants/env';
import { ASESOR_ROLE } from '../../../domains/projectAvailability/application/constants/project';

const hasEmail = (currentUser) => (currentUser?.email ? `login_hint=${currentUser.email}&` : '');

const googleCalendarAccessUrl = (uuid) =>
	`https://www.googleapis.com/auth/calendar&access_type=offline&state=${uuid}&include_granted_scopes=true`;

export const googleSyncUrl = ({ uuid, userRole, currentUser, currentPath, isConnectCalendar }) => {
	const syncCalendar =
		userRole === ASESOR_ROLE || isConnectCalendar
			? ` ${googleCalendarAccessUrl(uuid)}`
			: `&state=${uuid}&include_granted_scopes=true`;
	return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&${hasEmail(
		currentUser,
	)}prompt=consent&redirect_uri=${currentPath}&response_type=code&scope=email profile${syncCalendar}`;
};

export const microsoftSyncUrl = ({ uuid, userRole, currentUser, currentPath, isConnectCalendar }) => {
	const syncCalendar = userRole === ASESOR_ROLE || isConnectCalendar ? ` Calendars.ReadWrite offline_access` : '';
	return `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${hasEmail(
		currentUser,
	)}response_type=code&scope=user.read${syncCalendar}&client_id=${MICROSOFT_CLIENT_ID}&redirect_uri=${currentPath}&state=${uuid}&prompt=select_account`;
};
