import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getCurrentProject } from '@vecindario/suite-dashboard-layout-lib';
import { ColorPicker, TextTag } from '@vecindario/vecindario-suite-components';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { personalizationFields as fields, personalizationFields } from '../../../application/constants/customization';
import { selectCustomizationColors } from '../../../application/selector/customization';

import '../../pages/customization.scss';
import { rgba2hex } from '../../../../../shared/application/helpers/common-functions';
import { DOMAIN_NAME } from '../../../infrastructure/locales';
import * as i18nKeys from '../../../infrastructure/locales/translation_keys';

const ColorsSelectors = ({ item }) => {
	const { t } = useTranslation();
	const customizationColors = useSelector(selectCustomizationColors);
	const [personalization, setPersonalization] = useState(customizationColors);
	const currentProject = useSelector(getCurrentProject);

	const { watch, setValue } = useFormContext();

	const transformColor = (newColor, field) => {
		let style = '';
		let colorObject = null;
		const colors = watch()[personalizationFields.COLORS];

		if (field === fields.COMPONENT_BACKGROUND_COLOR) {
			style = `rgba(${newColor?.r || 255},${newColor?.g || 255},${newColor?.b || 255},${newColor?.a || 255})`;

			colorObject = { ...colors, [item?.type]: { backgroundColor: style, color: colors[item?.type]?.color } };
		} else if (field === fields.TEXT_COLOR) {
			style = `rgba(${newColor?.r || 255},${newColor?.g || 255},${newColor?.b || 255},${newColor?.a || 255})`;

			colorObject = { ...colors, [item?.type]: { color: style, backgroundColor: colors[item?.type]?.backgroundColor } };
		}

		setValue(personalizationFields.COLORS, colorObject);
	};

	const handleOnChangeColor = (newColor, field) => {
		transformColor(newColor, field);
		setPersonalization({ ...personalization, [field]: newColor });
	};

	const sectionStyle = watch()[personalizationFields.COLORS];

	const getExampleValue = () => {
		const prefix = currentProject?.currency_format?.prefix || '$';
		const suffix = currentProject?.currency_format?.suffix || 'COP';
		return `${prefix} 2.000.000 ${suffix}`;
	};

	return (
		<div className="style-config-container">
			<div className="style-config-select">
				<div className="title-area">
					<TextTag fw="bold" variant="-body-sm">
						{item.title}
					</TextTag>

					<TextTag fw="normal" variant="-body-xs">
						{item.copy}
					</TextTag>
				</div>
				<div className="color-selector-area">
					{item.showBackGroundColor && (
						<ColorPicker
							color={rgba2hex(sectionStyle?.[item?.type]?.backgroundColor)}
							onChangeColor={(newColor) => handleOnChangeColor(newColor, fields.COMPONENT_BACKGROUND_COLOR)}
							childrenPosition="end"
						>
							<TextTag tag="p" fw="normal" variant="-body-sm">
								{t(`${i18nKeys.BACKGROUND_COLOR_COMPONENT}`, { ns: DOMAIN_NAME })}
							</TextTag>
						</ColorPicker>
					)}
					<ColorPicker
						color={rgba2hex(sectionStyle?.[item?.type]?.color)}
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
				<div className="preview-box" style={sectionStyle?.[item?.type]}>
					<div>
						<TextTag fw="medium" variant="-body-xs">
							{t(`${i18nKeys.EXAMPLE_1}`, { ns: DOMAIN_NAME })} # 1
						</TextTag>
						<TextTag>{t(`${i18nKeys.EXAMPLE_2}`, { ns: DOMAIN_NAME })} 2023</TextTag>
					</div>
					<div>
						<TextTag fw="medium" variant="-body">
							{getExampleValue()}
						</TextTag>
					</div>
				</div>
			</div>
		</div>
	);
};

ColorsSelectors.propTypes = {
	item: PropTypes.object,
};

export default ColorsSelectors;
