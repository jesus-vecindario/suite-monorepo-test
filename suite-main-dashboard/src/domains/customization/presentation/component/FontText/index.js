import React from 'react';
import { Select, TextTag } from '@vecindario/vecindario-suite-components';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { FONT_OPTIONS, personalizationFields } from '../../../application/constants/customization';

import '../../pages/customization.scss';
import * as i18nKeys from '../../../infrastructure/locales/translation_keys';
import { DOMAIN_NAME } from '../../../infrastructure/locales';

const FontText = () => {
	const { watch, setValue } = useFormContext();
	const { t } = useTranslation();

	const handleOnChangeShape = (value) => {
		setValue(personalizationFields.FONT, value);
	};

	const sectionStyle = (type) => {
		const colorsStyle = watch()[personalizationFields.COLORS];
		return { fontFamily: watch()[personalizationFields.FONT], color: colorsStyle[type]?.color };
	};

	return (
		<div className="style-config-container top-margin">
			<div className="style-config-select">
				<div className="title-area">
					<TextTag fw="bold" variant="-body-sm">
						{t(`${i18nKeys.FONT}`, { ns: DOMAIN_NAME })}
					</TextTag>
					<TextTag fw="normal" variant="-body-xs">
						{t(`${i18nKeys.FONT_TEXT}`, { ns: DOMAIN_NAME })}
					</TextTag>
				</div>
				<div className="select-area">
					<Select
						id="font-selector"
						label={t(`${i18nKeys.TEXT_LABEL}`, { ns: DOMAIN_NAME })}
						options={FONT_OPTIONS}
						defaultOptionValue={watch()[personalizationFields.FONT]}
						onSelectItem={({ value }) => handleOnChangeShape(value)}
					/>
				</div>
			</div>
			<div className="style-config-preview">
				<TextTag fw="normal" variant="-body-xs" className="preview-text">
					{t(`${i18nKeys.PREVIEW}`, { ns: DOMAIN_NAME })}
				</TextTag>
				<div className="preview-box-shape column">
					<label className="preview-text-big" style={sectionStyle('primary')}>
						{t(`${i18nKeys.TEST_TEXT_TYPO}`, { ns: DOMAIN_NAME })}
					</label>
					<label className="preview-text-medium" style={sectionStyle('secondary')}>
						{t(`${i18nKeys.TEST_TEXT_TYPO}`, { ns: DOMAIN_NAME })}
					</label>
					<label className="preview-text-small" style={sectionStyle('tertiary')}>
						{t(`${i18nKeys.TEST_TEXT_TYPO}`, { ns: DOMAIN_NAME })}
					</label>
				</div>
			</div>
		</div>
	);
};

export default FontText;
