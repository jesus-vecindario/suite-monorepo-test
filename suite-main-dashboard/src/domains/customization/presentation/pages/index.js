import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, FooterSuite, Icon, TextTag } from '@vecindario/vecindario-suite-components';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './customization.scss';
import { getCurrentProject, setMessageToast } from '@vecindario/suite-dashboard-layout-lib';
import ColorsSelectors from '../component/ColorsSelectors';
import { LICENCE_FREE_PLAN, SET_COLORS_ARRAY } from '../../application/constants/customization';
import customizationFields, { defaultValues } from '../../application/schema/customizationFields';
import ButtonsStyle from '../component/ButtonsStyle';
import FieldsForm from '../component/FieldsForm';
import FontText from '../component/FontText';
import { DOMAIN_NAME } from '../../infrastructure/locales';
import * as i18nKeys from '../../infrastructure/locales/translation_keys';
import { requestGetCustomizationBySlug } from '../../application/slices/customization';
import { selectCustomizationColors } from '../../application/selector/customization';
import { postFetchCreateCustomization, patchFetchUpdateCustomization } from '../../infrastructure/api';
import { history } from '../../../../shared/application/helpers/history';
import { ICON_ROTATE_LEFT } from '../../../../shared/application/constants/icons';
import { useQuery } from '../../../../shared/application/hooks/useQuery';
import PremiumModal from '../../../../shared/presentation/components/PremiumModal';

const Customization = () => {
	const { t } = useTranslation();
	const { slug } = useParams();
	const dispatch = useDispatch();
	const currentProject = useSelector(getCurrentProject);
	const formRef = useRef();
	const [isEditing, setIsEditing] = useState(false);
	const customizationColors = useSelector(selectCustomizationColors);
	const [modalOpen, setModalOpen] = useState(false);
	const handleOpen = () => setModalOpen(!modalOpen);
	const fromOutside = useQuery('fromOutside');
	const isFree = currentProject?.licence_type === LICENCE_FREE_PLAN;

	const methods = useForm({
		resolver: yupResolver(customizationFields),
		mode: 'onChange',
		defaultValues,
	});

	const setCustomThemeValues = useCallback(
		(custom_theme) => {
			Object.keys(custom_theme).forEach((key) => {
				methods.setValue(key, custom_theme[key]);
			});
		},
		[methods],
	);

	useEffect(() => {
		const { custom_theme } = customizationColors;
		if (custom_theme) setCustomThemeValues(custom_theme);
	}, [customizationColors, setCustomThemeValues]);

	useEffect(() => {
		methods.reset(defaultValues);
		dispatch(requestGetCustomizationBySlug(slug));
	}, [dispatch, methods, slug]);

	const onSubmit = (data) => {
		if (isFree) {
			setModalOpen(!modalOpen);
		} else {
			const { id } = customizationColors;
			if (id) {
				patchFetchUpdateCustomization(slug, { custom_theme: data }).then((success) => {
					const { custom_theme } = success;
					dispatch(
						setMessageToast({
							type: 'success',
							message: t(`${i18nKeys.CUSTOMIZE_MESSAGE_1}`, { ns: DOMAIN_NAME }),
						}),
					);
					if (custom_theme) setCustomThemeValues(custom_theme);
				});
			} else {
				postFetchCreateCustomization(slug, { custom_theme: data }).then((success) => {
					const { custom_theme } = success;
					dispatch(
						setMessageToast({
							type: 'success',
							message: t(`${i18nKeys.CUSTOMIZE_MESSAGE_2}`, { ns: DOMAIN_NAME }),
						}),
					);
					if (custom_theme) setCustomThemeValues(custom_theme);
				});
			}

			setIsEditing(false);
		}
	};

	const resetTheme = () => {
		patchFetchUpdateCustomization(slug, { custom_theme: defaultValues }).then((success) => {
			methods.reset(defaultValues);
		});
	};

	useEffect(() => {
		const subscription = methods.watch((value, { name, values }) => {
			const { custom_theme } = customizationColors;
			try {
				const hasProperties = JSON.stringify(value[name]) === JSON.stringify(custom_theme[name]);
				if (hasProperties) {
					setIsEditing(false);
				} else {
					setIsEditing(true);
				}
			} catch (error) {
				if (error) setIsEditing(true);
			}
		});
		return () => subscription.unsubscribe();
	}, [customizationColors, methods]);

	const goBack = () => {
		history.goBack();
	};

	return (
		<FormProvider {...methods}>
			<Helmet title={'Vecindario Suite - Personalización - Colores'} />
			<form onSubmit={methods.handleSubmit(onSubmit)} id="config-form" ref={formRef}>
				{fromOutside && (
					<Button
						type="button"
						onClick={goBack}
						variant="bordered"
						size="-small"
						className="go-back-button"
						disabled={customizationColors?.id === null}
					>
						<Icon icon={ICON_ROTATE_LEFT} size="small" />
						{t(`${i18nKeys.RETURN_BUTTON}`, { ns: DOMAIN_NAME })}
					</Button>
				)}
				<div className="customization-container">
					<TextTag fw="bold" variant="-body">
						{t(`${i18nKeys.GENERAL_TITLE}`, { ns: DOMAIN_NAME })}
					</TextTag>
					<div className="save-button-area">
						<div className="content-area">
							<div>
								<Icon icon="ri-sticky-note-line" />
							</div>
							<div>
								<TextTag fw="bold" variant="-body-sm">
									{t(`${i18nKeys.GENERAL_STYLES_TITLE}`, { ns: DOMAIN_NAME })}
								</TextTag>
								<TextTag fw="normal" variant="-body-sm">
									{t(`${i18nKeys.GENERAL_STYLES_COPY}`, { ns: DOMAIN_NAME })}
								</TextTag>
							</div>
						</div>

						<div className="button-area">
							<Button
								type="button"
								onClick={resetTheme}
								variant="bordered"
								size="-small"
								className="action-button"
								disabled={customizationColors?.id === null}
							>
								{t(`${i18nKeys.RESET_STYLES_BUTTON}`, { ns: DOMAIN_NAME })}
							</Button>
							<Button
								id="customization-admin-save-changes"
								type="submit"
								variant="default"
								size="-small"
								className="action-button"
								disabled={!isEditing}
							>
								{t(`${i18nKeys.GENERAL_STYLES_BUTTON}`, { ns: DOMAIN_NAME })}
							</Button>
						</div>
					</div>
					{SET_COLORS_ARRAY(t, i18nKeys, DOMAIN_NAME).map((item, index) => {
						return <ColorsSelectors key={`color-${index}`} item={item} />;
					})}
					<ButtonsStyle />
					<FieldsForm />
					<FontText />
				</div>
				<PremiumModal isModalOpen={modalOpen} setIsModalOpen={handleOpen} />
			</form>
			<FooterSuite />
		</FormProvider>
	);
};

export default Customization;
