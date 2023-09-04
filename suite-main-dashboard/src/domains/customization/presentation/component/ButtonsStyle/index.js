import React, { useEffect, useState } from 'react';
import { Button, Select, TextTag } from '@vecindario/vecindario-suite-components';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import {
	SHAPE_OPTIONS,
	personalizationFields as fields,
	personalizationFields,
} from '../../../application/constants/customization';

import '../../pages/customization.scss';
import * as i18nKeys from '../../../infrastructure/locales/translation_keys';
import { DOMAIN_NAME } from '../../../infrastructure/locales';

const ButtonsStyle = () => {
	const { watch, setValue } = useFormContext();
	const { t, i18n } = useTranslation();
	const [shapeOptions, setShapeOptions] = useState(SHAPE_OPTIONS(t, i18nKeys, DOMAIN_NAME));

	const handleOnChangeShape = (value) => {
		const buttonShape = { shape: value };
		setValue(personalizationFields.BUTTONS, buttonShape);
	};

	const sectionStyle = (type) => {
		const colorsStyle = watch()[personalizationFields.COLORS];
		return {
			...watch()[personalizationFields.BUTTONS],
			color: colorsStyle[type]?.color,
			backgroundColor: colorsStyle[type]?.backgroundColor,
		};
	};

	useEffect(() => {
		const handleLanguageChange = () => {
			setShapeOptions(SHAPE_OPTIONS(t, i18nKeys, DOMAIN_NAME));
		};

		i18n.on('languageChanged', handleLanguageChange);

		return () => {
			i18n.off('languageChanged', handleLanguageChange);
		};
	}, [i18n, t]);

	return (
		<>
			<div className="style-config-container top-margin">
				<div className="style-config-select">
					<div className="title-area">
						<TextTag fw="bold" variant="-body-sm">
							{t(`${i18nKeys.BUTTONS}`, { ns: DOMAIN_NAME })}
						</TextTag>
						<TextTag fw="normal" variant="-body-xs">
							{t(`${i18nKeys.BUTTONS_TEXT}`, { ns: DOMAIN_NAME })}
						</TextTag>
					</div>
					<div className="select-area">
						<Select
							id="shape-selector"
							label={t(`${i18nKeys.SHAPE_LABEL}`, { ns: DOMAIN_NAME })}
							options={shapeOptions}
							defaultOptionValue={watch()[personalizationFields.BUTTONS][fields.SHAPE]}
							onSelectItem={({ value }) => handleOnChangeShape(value)}
						/>
					</div>
				</div>
				<div className="style-config-preview">
					<TextTag fw="normal" variant="-body-xs" className="preview-text">
						{t(`${i18nKeys.PREVIEW}`, { ns: DOMAIN_NAME })}
					</TextTag>
					<div className="preview-box-shape">
						<Button
							type="button"
							text={t(`${i18nKeys.SEND_BUTTON}`, { ns: DOMAIN_NAME })}
							size="-medium"
							className={`customized-shape ${sectionStyle()?.shape}`}
							style={sectionStyle('primary')}
						/>
						<Button
							type="button"
							text={t(`${i18nKeys.SEND_BUTTON}`, { ns: DOMAIN_NAME })}
							size="-medium"
							className={`customized-shape ${sectionStyle()?.shape}`}
							style={sectionStyle('secondary')}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

ButtonsStyle.propTypes = {
	item: PropTypes.array,
};

export default ButtonsStyle;
