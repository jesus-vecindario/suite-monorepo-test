import React from 'react';
import {
	configurationRoute,
	dashboardScheduleRoute,
	profileAvailabilityRoute,
	toolsRoute,
} from '../../../domains/dashboard/infrastructure/routes';
import { ICON_BUILDING, ICON_CHECK_LINE, ICON_SETTINGS, ICON_STATS, ICON_TOOLS } from './icons';
import { profileSyncRoute } from '../../../domains/profile/infrastructure/routes';
import NoSyncDot from '../../../domains/profile/presentation/components/noSyncDot';

export const adviserRoutes = (slug, hasCalendar) => {
	const syncPath = {
		path: profileSyncRoute,
		className: ICON_CHECK_LINE,
		text: 'Sincronización',
		extra: !hasCalendar ? <NoSyncDot /> : null,
	};

	return [
		{
			path: dashboardScheduleRoute(slug),
			className: ICON_STATS,
			text: 'Cronología',
		},
		{
			path: profileAvailabilityRoute(slug),
			className: ICON_BUILDING,
			text: 'Mi disponibilidad',
		},
		syncPath,
	];
};

export const directorRoutes = (slug) => [
	{
		path: toolsRoute(slug),
		className: ICON_TOOLS,
		text: 'Herramientas',
	},
	// {
	// 	path: integrationRoute(slug),
	// 	className: ICON_INTEGRATION,
	// 	text: 'Integraciones',
	// },
	{
		path: configurationRoute(slug),
		className: ICON_SETTINGS,
		text: 'Configuración',
	},
];
