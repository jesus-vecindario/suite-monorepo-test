import * as Yup from 'yup';
// import { EMPTY_FIELD, WRONG_TYPE } from '../../../../shared/application/constants/messages/error-messages';
import { personalizationFields } from '../constants/customization';

export default Yup.object().shape({
	[personalizationFields.COLORS]: Yup.object(),
	[personalizationFields.BUTTONS]: Yup.object(),
	[personalizationFields.FORM_FIELDS]: Yup.object(),
	[personalizationFields.TYPOGRAPHY]: Yup.string(),
});

const colorsDefault = {
	primary: { backgroundColor: 'rgba(255,255,255,1)', color: 'rgba(0,0,0,1)' },
	secondary: { backgroundColor: 'rgba(0,0,0,1)', color: 'rgba(255,255,255,1)' },
	tertiary: { color: 'rgba(36, 78, 241, 1)' },
};

export const defaultValues = {
	[personalizationFields.COLORS]: colorsDefault,
	[personalizationFields.BUTTONS]: { shape: 'round' },
	[personalizationFields.FORM_FIELDS]: {
		shape: 'round',
		borderColor: 'rgba(0,0,0,1)',
		color: 'rgba(255,255,255,1)',
	},
	[personalizationFields.FONT]: 'DM-sans',
};
