export const personalizationFields = {
	COLORS: 'colors',
	BUTTONS: 'buttons',
	FORM_FIELDS: 'formFields',
	FONT: 'font',
	SHAPE: 'shape',
	TEXT_COLOR: 'color',
	COMPONENT_BACKGROUND_COLOR: 'backgroundColor',
	BORDER_COLOR: 'borderColor',
	BUTTON_COLOR: 'button_color',
	EXPLANATORY_NOTES: 'explanatory_notes',
};

export const SHAPES = {
	ROUND: 'round',
	SQUARE: 'square',
	ROUNDED_BORDERS: 'rounded-borders',
};

export const SHAPE_OPTIONS = (t, i18nKeys, DOMAIN_NAME) => {
	return [
		{ label: t(`${i18nKeys.SHAPE_ROUNDED_BUTTON}`, { ns: DOMAIN_NAME }), value: SHAPES.ROUND },
		{ label: t(`${i18nKeys.SHAPE_SQUARE_BUTTON}`, { ns: DOMAIN_NAME }), value: SHAPES.SQUARE },
		{ label: t(`${i18nKeys.SHAPE_ROUNDED_BORDERS_BUTTON}`, { ns: DOMAIN_NAME }), value: SHAPES.ROUNDED_BORDERS },
	];
};

export const FONT_OPTIONS = [
	{ label: 'DM-sans', value: 'DM-sans' },
	{ label: 'Lato', value: 'Lato' },
	{ label: 'Roboto', value: 'Roboto' },
	{ label: 'Poppins', value: 'Poppins' },
	{ label: 'Quicksand', value: 'Quicksand' },
	{ label: 'Open Sans', value: 'Open Sans' },
	{ label: 'Noto Sans JP', value: 'Noto Sans JP' },
	{ label: 'Montserrat', value: 'Montserrat' },
	{ label: 'Source Sans Pro', value: 'Source Sans Pro' },
	{ label: 'Oswald', value: 'Oswald' },
	{ label: 'Sansita Swashed', value: 'Sansita Swashed' },
	{ label: 'Comfortaa', value: 'Comfortaa' },
	{ label: 'Baloo 2', value: "'Baloo 2', 'Roboto', 'sans-serif'" },
];

export const EXPLANATORY_NOTES_MAX_LENGTH = 10000;
export const FOOTER_MAX_LENGTH = 170;

export const SET_COLORS_ARRAY = (t, i18nKeys, DOMAIN_NAME) => {
	return [
		{
			title: t(`${i18nKeys.PRIMARY_COLOR_TITLE}`, { ns: DOMAIN_NAME }),
			copy: t(`${i18nKeys.PRIMARY_COLOR_COPY}`, { ns: DOMAIN_NAME }),
			showBackGroundColor: true,
			type: 'primary',
		},
		{
			title: t(`${i18nKeys.SECONDARY_COLOR_TITLE}`, { ns: DOMAIN_NAME }),
			copy: t(`${i18nKeys.SECONDARY_COLOR_COPY}`, { ns: DOMAIN_NAME }),
			showBackGroundColor: true,
			type: 'secondary',
		},
		{
			title: t(`${i18nKeys.TERTIARY_COLOR_TITLE}`, { ns: DOMAIN_NAME }),
			copy: t(`${i18nKeys.TERTIARY_COLOR_COPY}`, { ns: DOMAIN_NAME }),
			showBackGroundColor: false,
			type: 'tertiary',
		},
	];
};

export const LICENCE_FREE_PLAN = 'free';
export const LINK_GO_PREMIUM = 'https://www.vecindariosuite.com/#get-demo ';
