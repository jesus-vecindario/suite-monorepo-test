import * as yup from 'yup';
import { analyticsFields } from '../constants/analytics';
import { ERROR_MESSAGES } from '../../../../shared/infrastructure/i18n/locales/translation_keys';

const analyticsSchema = yup.object().shape({
	[analyticsFields.ACTIVE]: yup.boolean(),
	[analyticsFields.GOOGLE_TAG_MANAGER]: yup.string().when(analyticsFields.ACTIVE, (isActive, schema) => {
		return isActive ? schema.required(ERROR_MESSAGES.EMPTY_FIELD) : schema.nullable();
	}),
});

export default analyticsSchema;
