import React from 'react';
import PropTypes from 'prop-types';
import { Icon, TextTag, Input, useTranslate } from '@vecindario/vecindario-suite-components';
import { useController } from 'react-hook-form';
import { ICON_GOOGLE } from '../../../../../shared/application/constants/icons';
import { analyticsFields } from '../../../application/constants/analytics';
import './GtmInput.scss';
import { DOMAIN_NAME as SHARED_DOMAIN } from '../../../../../shared/infrastructure/i18n/locales';
import { GTM_INPUT } from '../../../infrastructure/locales/translation_keys';
import { DOMAIN_NAME } from '../../../infrastructure/locales';

// GTM stands for Google Tag Manager
const GtmInput = ({ control }) => {
	const {
		field: { value, onChange, name },
		formState: { errors },
	} = useController({ control, name: analyticsFields.GOOGLE_TAG_MANAGER });

	const errorTagManager = useTranslate(errors[analyticsFields.GOOGLE_TAG_MANAGER]?.message, SHARED_DOMAIN);

	return (
		<article className="gtm-input">
			<Icon icon={ICON_GOOGLE} size="medium" />
			<TextTag tag="b" variant="-body" fw="bold">
				Google Tag Manager (GTM) id
			</TextTag>
			<div className="card-input">
				<Input
					name={name}
					value={value}
					onChange={onChange}
					label={useTranslate(GTM_INPUT.LABEL, DOMAIN_NAME)}
					error={errorTagManager}
				/>
			</div>
		</article>
	);
};

GtmInput.propTypes = {
	control: PropTypes.object,
};

export default GtmInput;
