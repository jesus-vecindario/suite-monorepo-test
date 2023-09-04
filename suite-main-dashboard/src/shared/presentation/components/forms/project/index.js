import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	Button,
	Cropper,
	Icon,
	Input,
	MessageError,
	Select,
	TextTag,
	Tooltip,
	useTranslate,
} from '@vecindario/vecindario-suite-components';
import { useTranslation } from 'react-i18next';
import { projectSchema, setManualError } from '../../../../application/helpers/validations/project';
import {
	PROJECT_TYPE_OPTIONS,
	projectFields,
	PROJECT_STATUS_OPTIONS,
	CURRENCY_OPTIONS,
	UNIT_OF_MEASUREMENT_OPTIONS,
	INTERNATIONALIZATION_CONFIG_FIELD,
	LANGUAGE_OPTIONS,
} from '../../../../application/constants/project';
import { transformProjectData } from '../../../../../domains/project/application/helpers/project';
import { createProject } from '../../../../../domains/wizardProject/infrastructure/api/project';
import { SET_VALUE_OPTIONS } from '../../../../../domains/project/application/helpers/validations';
import { ICON_ADD_IMAGE, ICON_MAP } from '../../../../application/constants/icons';
import ModalLocateProject from './ModalLocateProject';
import './FormProject.scss';
import { updateProjectBySlug } from '../../../../../domains/project/infrastructure';
import { differencesBetweenObjects } from '../../../../application/helpers/common-functions';
import { LICENCE_FREE_PLAN } from '../../../../application/constants/premium';
import { DOMAIN_NAME as SHARED_DOMAIN } from '../../../../infrastructure/i18n/locales';
import { FORM_PROJECT } from '../../../../infrastructure/i18n/locales/translation_keys';

const FormProject = ({
	title,
	subtitle,
	onSucessSubmit,
	handleOnFailure,
	initialProjectData,
	licenceType,
	handleLock,
}) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(!open);
	const handleClose = () => setOpen(false);
	const [cropperError, setCropperError] = useState();
	const { t } = useTranslation();

	const {
		control,
		register,
		setValue,
		setError,
		clearErrors,
		getValues,
		handleSubmit,
		setFocus,
		watch,
		formState: { errors, isDirty, isValid },
	} = useForm({
		mode: 'onChange',
		defaultValues: initialProjectData,
		resolver: yupResolver(projectSchema),
	});

	const errorFieldType = useTranslate(errors[projectFields.TYPE]?.message, SHARED_DOMAIN);
	const errorFieldStatus = useTranslate(errors[projectFields.STATUS]?.message, SHARED_DOMAIN);
	const errorFieldPersonalData = useTranslate(errors[projectFields.PROCESSING_OF_PERSONAL_DATA]?.message, SHARED_DOMAIN);
	const errorFieldTermCondition = useTranslate(errors[projectFields.TERMS_AND_CONDITIONS]?.message, SHARED_DOMAIN);
	const errorFieldLanguage = useTranslate(errors[projectFields.LANGUAGE]?.message, SHARED_DOMAIN);
	const errorFieldCurrency = useTranslate(
		errors[INTERNATIONALIZATION_CONFIG_FIELD]?.[projectFields.CURRENCY]?.message,
		SHARED_DOMAIN,
	);
	const errorFieldUnit = useTranslate(
		errors[INTERNATIONALIZATION_CONFIG_FIELD]?.[projectFields.UNIT_OF_MEASUREMENT]?.message,
		SHARED_DOMAIN,
	);

	const projectTypeOptions = useMemo(() => PROJECT_TYPE_OPTIONS(t), [t]);
	const projectStatusOptions = useMemo(() => PROJECT_STATUS_OPTIONS(t), [t]);
	const languageOptions = useMemo(() => LANGUAGE_OPTIONS(t), [t]);
	const currencyOptions = useMemo(() => CURRENCY_OPTIONS(t), [t]);
	const unitOfMeasurementOptions = useMemo(() => UNIT_OF_MEASUREMENT_OPTIONS(t), [t]);

	const setFormErrors = (formErrors = {}) => {
		Object.keys(formErrors).forEach((key) => {
			setFocus(key);
			setError(key, setManualError(formErrors[key]));
		});
	};

	const handleSetImageToCrop = (img) => {
		setValue(projectFields.LOGO, img, { shouldValidate: true, shouldDirty: true });
		setCropperError(null);
	};

	const imageToCrop = watch()[projectFields.LOGO];
	const selectedCity = watch()[projectFields.CITY];

	const submitForm = (body) => {
		const dataBody = transformProjectData(body);
		const formData = new FormData();
		Object.keys(dataBody).forEach((key) => {
			formData.append(key, dataBody[key] || null);
		});
		if (initialProjectData && Object.keys(initialProjectData).length > 0) {
			const newData = differencesBetweenObjects(initialProjectData, body, {});
			if (newData.city) {
				newData.project_city = newData.city;
				delete newData.city;
			}
			updateProjectBySlug(initialProjectData?.slug, transformProjectData(newData))
				.then((data) => {
					onSucessSubmit(data);
				})
				.catch((error) => {
					setFormErrors(error);
					handleOnFailure();
				});
		} else {
			createProject(formData)
				.then((data) => {
					onSucessSubmit(data);
				})
				.catch((error) => {
					setFormErrors(error);
					handleOnFailure();
				});
		}
	};

	const onSubmit = (data) => {
		submitForm(data, setFormErrors);
	};

	const handleOnChange = ({ ...args }) => {
		setValue(args.target.name, args.target.value, SET_VALUE_OPTIONS);
	};

	return (
		<>
			<div className="header-step-project">
				<TextTag tag="h4" className="title">
					{title}
				</TextTag>
				<TextTag variant="-body-sm" className="subtitle">
					{subtitle}
				</TextTag>
			</div>
			<form className="form-create-project" onSubmit={handleSubmit(onSubmit)}>
				<Input
					label={t(FORM_PROJECT.INPUT_LABEL, { ns: SHARED_DOMAIN })}
					required={true}
					name={projectFields.NAME}
					error={useTranslate(errors[projectFields.NAME]?.message, SHARED_DOMAIN)}
					defaultValue={initialProjectData[projectFields.NAME]}
					{...register(projectFields.NAME)}
				/>

				<Controller
					control={control}
					name={projectFields.TYPE}
					render={({ field: { onChange, value, name } }) => (
						<Select
							onSelectItem={(item) => onChange(item.value)}
							label={t(FORM_PROJECT.TYPE_PROJECT, { ns: SHARED_DOMAIN })}
							required={true}
							id={name}
							options={projectTypeOptions}
							defaultOptionValue={initialProjectData[projectFields.TYPE]}
							error={errorFieldType}
						/>
					)}
				/>

				<Controller
					control={control}
					name={projectFields.STATUS}
					render={({ field: { onChange, value, name } }) => (
						<Select
							onSelectItem={(item) => onChange(item.value)}
							label={t(FORM_PROJECT.STATE_PROJECT, { ns: SHARED_DOMAIN })}
							id={name}
							options={projectStatusOptions}
							required={false}
							defaultOptionValue={initialProjectData[projectFields.STATUS] || null}
							error={errorFieldStatus}
						/>
					)}
				/>

				<div className="container-input-tooltip">
					<label className="input-label" htmlFor={projectFields.PROCESSING_OF_PERSONAL_DATA}>
						{t(FORM_PROJECT.LABEL_1, { ns: SHARED_DOMAIN })}
						<Tooltip position="left" text={t(FORM_PROJECT.PROCESSING_OF_PERSONAL_DATA, { ns: SHARED_DOMAIN })}>
							<Icon icon="ri-question-line" />
						</Tooltip>
					</label>
					<Input
						name={projectFields.PROCESSING_OF_PERSONAL_DATA}
						error={errorFieldPersonalData}
						{...register(projectFields.PROCESSING_OF_PERSONAL_DATA)}
						defaultValue={initialProjectData[projectFields.PROCESSING_OF_PERSONAL_DATA]}
					/>
				</div>

				<div className="container-input-tooltip grid-colum">
					<label className="input-label" htmlFor={projectFields.TERMS_AND_CONDITIONS}>
						{t(FORM_PROJECT.LABEL_2, { ns: SHARED_DOMAIN })}
						<Tooltip position="left" text={t(FORM_PROJECT.TERMS_AND_CONDITIONS, { ns: SHARED_DOMAIN })}>
							<Icon icon="ri-question-line" />
						</Tooltip>
					</label>
					<Input
						name={projectFields.TERMS_AND_CONDITIONS}
						error={errorFieldTermCondition}
						{...register(projectFields.TERMS_AND_CONDITIONS)}
						defaultValue={initialProjectData[projectFields.TERMS_AND_CONDITIONS]}
					/>
				</div>
				<div className="container-input-tooltip grid-colum">
					<label className="input-label" htmlFor={projectFields.LANGUAGE}>
						{t(FORM_PROJECT.LABEL_3, { ns: SHARED_DOMAIN })}
						<Tooltip position="left" text={t(FORM_PROJECT.LANGUAGE, { ns: SHARED_DOMAIN })}>
							<Icon icon="ri-question-line" />
						</Tooltip>
					</label>
					<Controller
						control={control}
						name={projectFields.LANGUAGE}
						render={({ field: { onChange, value, name } }) => (
							<Select
								onSelectItem={(item) => onChange(item.value)}
								label=" "
								id={name}
								options={languageOptions}
								defaultOptionValue={initialProjectData[projectFields.LANGUAGE] || null}
								error={errorFieldLanguage}
							/>
						)}
					/>
				</div>
				<div className="container-input-tooltip grid-colum">
					<Controller
						control={control}
						name={`${INTERNATIONALIZATION_CONFIG_FIELD}.${projectFields.CURRENCY}`}
						render={({ field: { onChange, value, name } }) => (
							<Select
								onSelectItem={(item) => onChange(item.value)}
								label={t(FORM_PROJECT.LABEL_4, { ns: SHARED_DOMAIN })}
								required={true}
								id={name}
								options={currencyOptions}
								defaultOptionValue={initialProjectData[INTERNATIONALIZATION_CONFIG_FIELD]?.[projectFields.CURRENCY]}
								error={errorFieldCurrency}
							/>
						)}
					/>
				</div>
				<div className="container-input-tooltip grid-colum">
					<Controller
						control={control}
						name={`${INTERNATIONALIZATION_CONFIG_FIELD}.${projectFields.UNIT_OF_MEASUREMENT}`}
						render={({ field: { onChange, value, name } }) => (
							<Select
								onSelectItem={(item) => onChange(item.value)}
								label={t(FORM_PROJECT.LABEL_5, { ns: SHARED_DOMAIN })}
								required={true}
								id={name}
								options={unitOfMeasurementOptions}
								defaultOptionValue={initialProjectData[INTERNATIONALIZATION_CONFIG_FIELD]?.[projectFields.UNIT_OF_MEASUREMENT]}
								error={errorFieldUnit}
							/>
						)}
					/>
				</div>

				<section className="attach-logo-project">
					<TextTag variant="-body-sm" className="title">
						{t(FORM_PROJECT.TEXT_TAG_1, { ns: SHARED_DOMAIN })}
					</TextTag>
					<div className="contianer-cropper">
						<div className="uploaded-image">
							{imageToCrop ? (
								<img className="img" src={imageToCrop} alt="" />
							) : (
								<Icon aditionalClassName="icon" icon={ICON_ADD_IMAGE} size="medium" />
							)}
						</div>
						<section className="upload-info">
							<TextTag variant="-body-xs" className="information">
								{t(FORM_PROJECT.TEXT_TAG_2, { ns: SHARED_DOMAIN })}
							</TextTag>
							<Cropper
								setImage={handleSetImageToCrop}
								aspectRatio={1 / 1}
								image={imageToCrop}
								minWidth={250}
								minHeight={250}
								textButton={t(FORM_PROJECT.CROPPER_TEXT_BUTTON, { ns: SHARED_DOMAIN })}
								buttonVariant="secondary"
								buttonClassName="button-cropper"
								setErrors={(e) => setCropperError(e)}
								actionCallback={licenceType === LICENCE_FREE_PLAN && handleLock}
							/>
						</section>
					</div>
					{cropperError ? <MessageError message={cropperError} showIcon={true} /> : null}
				</section>

				<section className="locate-project">
					<Input
						label={t(FORM_PROJECT.UBICATION_LABEL, { ns: SHARED_DOMAIN })}
						required={true}
						value={selectedCity || '-'}
						disabled={true}
					/>
					<Button type="button" variant="bordered" className="button-locate" onClick={() => handleOpen()}>
						<Icon icon={ICON_MAP} aditionalClassName="icon" />
						{t(FORM_PROJECT.UBICATION_BUTTON, { ns: SHARED_DOMAIN })}
					</Button>
				</section>
				{errors.generalError && (
					<p className="red-text text-center mt-2">
						{errors.generalError || t(FORM_PROJECT.GENERAL_ERROR, { ns: SHARED_DOMAIN })}
					</p>
				)}
				<Button className="button-submit" type="submit" disabled={!isDirty || !isValid}>
					{Object.keys(initialProjectData).length > 0
						? t(FORM_PROJECT.BUTTON_SAVE, { ns: SHARED_DOMAIN })
						: t(FORM_PROJECT.BUTTON_NEW, { ns: SHARED_DOMAIN })}
				</Button>
			</form>
			<ModalLocateProject
				isModalOpen={open}
				setIsModalOpen={() => handleClose()}
				control={control}
				register={register}
				setError={setError}
				clearErrors={clearErrors}
				errors={errors}
				getValues={getValues}
				setValue={setValue}
				onChangeField={handleOnChange}
				watch={watch}
			/>
		</>
	);
};

FormProject.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	onSucessSubmit: PropTypes.func,
	handleOnFailure: PropTypes.func,
	initialProjectData: PropTypes.object,
	licenceType: PropTypes.string,
	handleLock: PropTypes.func,
};

FormProject.defaultProps = {
	onSucessSubmit: () => {},
	handleOnFailure: () => {},
	initialProjectData: {},
};

export default FormProject;
