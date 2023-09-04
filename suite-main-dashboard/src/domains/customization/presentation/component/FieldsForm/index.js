import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ColorPicker, Input, Select, TextTag } from '@vecindario/vecindario-suite-components';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
	SHAPE_OPTIONS,
	personalizationFields as fields,
	personalizationFields,
} from '../../../application/constants/customization';
import { selectCustomizationColors } from '../../../application/selector/customization';

import '../../pages/customization.scss';
import { rgba2hex } from '../../../../../shared/application/helpers/common-functions';
import * as i18nKeys from '../../../infrastructure/locales/translation_keys';
import { DOMAIN_NAME } from '../../../infrastructure/locales';

const FieldsForm = () => {
	const { t, i18n } = useTranslation();
	const customizationColors = useSelector(selectCustomizationColors);
	const [personalization, setPersonalization] = useState(customizationColors);
	const [shapeOptions, setShapeOptions] = useState(SHAPE_OPTIONS(t, i18nKeys, DOMAIN_NAME));

	const { watch, setValue } = useFormContext();

	const transformColor = (newColor, field) => {
		const style = `rgba(${newColor?.r || 255},${newColor?.g || 255},${newColor?.b || 255},${newColor?.a || 255})`;
		const inputsStyle = watch()[personalizationFields.FORM_FIELDS];
		setValue(personalizationFields.FORM_FIELDS, { ...inputsStyle, [field]: style });
	};

	const handleOnChangeColor = (newColor, field) => {
		transformColor(newColor, field);
		setPersonalization({ ...personalization, [field]: newColor });
	};

	const handleOnChangeShape = (value) => {
		const shape = watch()[personalizationFields.FORM_FIELDS];
		setValue(personalizationFields.FORM_FIELDS, { ...shape, shape: value });
	};

	const sectionStyle = watch()[personalizationFields.FORM_FIELDS];

	const shapeBorderRadius = (shape) => {
		switch (shape) {
			case 'square':
				return '0';
			case 'round':
				return '32px';
			case 'rounded-borders':
				return '3px';
			default:
				return 0;
		}
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
		<div className="style-config-container top-margin">
			<div className="style-config-select">
				<div className="title-area">
					<TextTag fw="bold" variant="-body-sm">
						{t(`${i18nKeys.FORM_FIELD}`, { ns: DOMAIN_NAME })}
					</TextTag>

					<TextTag fw="normal" variant="-body-xs">
						{t(`${i18nKeys.FORM_FIELD_TEXT}`, { ns: DOMAIN_NAME })}
					</TextTag>
				</div>
				<div className="select-area">
					<Select
						id="input-shape-selector"
						label={t(`${i18nKeys.SHAPE_LABEL}`, { ns: DOMAIN_NAME })}
						options={shapeOptions}
						defaultOptionValue={sectionStyle?.shape}
						onSelectItem={({ value }) => handleOnChangeShape(value)}
					/>
				</div>
				<div className="color-selector-area">
					<ColorPicker
						color={rgba2hex(sectionStyle?.borderColor)}
						onChangeColor={(newColor) => handleOnChangeColor(newColor, fields.BORDER_COLOR)}
						childrenPosition="end"
					>
						<TextTag tag="p" fw="normal" variant="-body-sm">
							{t(`${i18nKeys.BORDER_COLOR_TEXT}`, { ns: DOMAIN_NAME })}
						</TextTag>
					</ColorPicker>
					<ColorPicker
						color={rgba2hex(sectionStyle?.color)}
						onChangeColor={(newColor) => handleOnChangeColor(newColor, fields.TEXT_COLOR)}
						childrenPosition="end"
					>
						<TextTag tag="p" fw="normal" variant="-body-sm">
							{t(`${i18nKeys.COLOR_TEXT}`, { ns: DOMAIN_NAME })}
						</TextTag>
					</ColorPicker>
				</div>
			</div>
			<div className="style-config-preview">
				<TextTag fw="normal" variant="-body-xs" className="preview-text">
					{t(`${i18nKeys.PREVIEW}`, { ns: DOMAIN_NAME })}
				</TextTag>
				<div className="preview-box-shape">
					<Input
						className={`customized-shape ${sectionStyle[fields.SHAPE]}`}
						label={t(`${i18nKeys.DESCRIPTION_TEXT}`, { ns: DOMAIN_NAME })}
						placeholder={t(`${i18nKeys.INPUT_PLACEHOLDER}`, { ns: DOMAIN_NAME })}
						labelStyle={sectionStyle}
						containerStyle={{
							borderRadius: shapeBorderRadius(sectionStyle[fields.SHAPE]),
							borderColor: sectionStyle[fields.BORDER_COLOR],
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default FieldsForm;
