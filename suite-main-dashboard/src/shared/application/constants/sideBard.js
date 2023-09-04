import { boardRoute } from '../../../domains/board/infrastructure/routing/routes';
import { adminModulesRoute } from '../../../domains/modules/infrastructure/routing/routes';
import { adminEditRoute } from '../../../domains/project/infrastructure/routing/routes';
import { adminTeamRoute } from '../../../domains/team/infrastructure/routing/routes';
import {
	ICON_HOME_LINE,
	ICON_EDIT_LINE,
	ICON_WINDOW_LINE,
	ICON_TEAM_LINE,
	ICON_SETTINGS_LINE,
	ICON_BRUSH_LINE,
} from './icons';
import { trackingRoute, configurationRoute } from '../../../domains/configuration/infrastructure/routing/routes';
import { SIDE_BAR_ITEMS_KEYS } from '../../infrastructure/i18n/locales/translation_keys';
import { DOMAIN_NAME } from '../../infrastructure/i18n/locales';
import { themeConfig } from '../../../domains/customization/infrastructure/routing/routes';

export const SIDE_BAR_ITEMS = (t) => {
	return [
		{
			className: ICON_HOME_LINE,
			text: t(SIDE_BAR_ITEMS_KEYS.BOARD, { ns: DOMAIN_NAME }),
			path: boardRoute(),
		},
		{
			className: ICON_EDIT_LINE,
			text: t(SIDE_BAR_ITEMS_KEYS.EDIT, { ns: DOMAIN_NAME }),
			path: adminEditRoute(),
		},
		{
			className: ICON_WINDOW_LINE,
			text: t(SIDE_BAR_ITEMS_KEYS.MODULES, { ns: DOMAIN_NAME }),
			path: adminModulesRoute(),
		},
		{
			className: ICON_TEAM_LINE,
			text: t(SIDE_BAR_ITEMS_KEYS.TEAM, { ns: DOMAIN_NAME }),
			path: adminTeamRoute(),
		},
		{
			className: ICON_BRUSH_LINE,
			text: t(SIDE_BAR_ITEMS_KEYS.PERSONALIZATION, { ns: DOMAIN_NAME }),
			path: themeConfig(),
		},
		{
			className: ICON_SETTINGS_LINE,
			text: t(SIDE_BAR_ITEMS_KEYS.CONFIGURATION, { ns: DOMAIN_NAME }),
			pathIdenfifier: configurationRoute(),
			menuItems: [
				{
					path: trackingRoute(),
					text: t(SIDE_BAR_ITEMS_KEYS.CONFIGURATION_ANALYTIC, { ns: DOMAIN_NAME }),
					className: '',
				},
			],
		},
	];
};

export default {};
