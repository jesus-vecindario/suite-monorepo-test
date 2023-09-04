import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentProject, setMessageToast } from '@vecindario/suite-dashboard-layout-lib';
import { TextTag, Button, FooterSuite } from '@vecindario/vecindario-suite-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useTranslation } from 'react-i18next';
import ConfigurationCard from '../../components/ConfigurationCard';
import GtmInput from '../../components/GtmInput';
import { analyticsFields, defaultValues } from '../../../application/constants/analytics';
import analyticsSchema from '../../../application/schema/analytics';
import { patchTrackingConfiguration } from '../../../infrastructure/api';
import './TrackingPage.scss';
import { TRACKING_PAGE } from '../../../infrastructure/locales/translation_keys';
import { DOMAIN_NAME } from '../../../infrastructure/locales';

const TrackingPage = () => {
	const [activeAnalytics, setActiveAnalytics] = useState(false);
	const [loading, setLoading] = useState(false);
	const { project_tracking, slug } = useSelector(getCurrentProject) || {};
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const {
		control,
		handleSubmit,
		setValue,
		formState: { isDirty, isValid },
		reset,
	} = useForm({
		reValidateMode: 'onChange',
		resolver: yupResolver(analyticsSchema),
	});

	useEffect(() => {
		setActiveAnalytics(project_tracking?.[analyticsFields.ACTIVE]);
		setValue(analyticsFields.ACTIVE, project_tracking?.[analyticsFields.ACTIVE]);
		setValue(analyticsFields.GOOGLE_TAG_MANAGER, project_tracking?.[analyticsFields.GOOGLE_TAG_MANAGER] || '');
	}, [project_tracking, setValue]);

	const onSubmit = (values) => {
		setLoading(true);
		patchTrackingConfiguration(slug, {
			project_tracking: {
				...values,
				[analyticsFields.GOOGLE_TAG_MANAGER]: values[analyticsFields.GOOGLE_TAG_MANAGER]?.trim(),
			},
		})
			.then((data) => {
				dispatch(
					setMessageToast({
						type: 'success',
						message: t(TRACKING_PAGE.TOAST_SUCCESS, { ns: DOMAIN_NAME }),
					}),
				);
				reset(data);
			})
			.finally(() => setLoading(false));
	};

	const handleToggle = (value) => {
		setActiveAnalytics(value);
		setValue(analyticsFields.ACTIVE, value);
		onSubmit(defaultValues(value));
	};

	return (
		<section className="tracking-page">
			<div>
				<TextTag tag="h2" fw="bold">
					{t(TRACKING_PAGE.TEXT_TAG_1, { ns: DOMAIN_NAME })}
				</TextTag>
				<TextTag tag="p" variant="-body-sm">
					{t(TRACKING_PAGE.TEXT_TAG_2, { ns: DOMAIN_NAME })}
				</TextTag>
			</div>
			<ConfigurationCard
				title={t(TRACKING_PAGE.CONFIGURATION_CARD_TITLE, { ns: DOMAIN_NAME })}
				description={t(TRACKING_PAGE.CONFIGURATION_CARD_DESCRIPTION, { ns: DOMAIN_NAME })}
				active={activeAnalytics}
				onChange={handleToggle}
			/>
			<form className={`form ${activeAnalytics ? 'active' : ''}`} onSubmit={handleSubmit(onSubmit)}>
				<GtmInput control={control} />
				<Button type="submit" className="submit" disabled={!isDirty || !isValid || loading}>
					{t(TRACKING_PAGE.BUTTON, { ns: DOMAIN_NAME })}
				</Button>
			</form>
			<FooterSuite />
		</section>
	);
};

export default TrackingPage;
