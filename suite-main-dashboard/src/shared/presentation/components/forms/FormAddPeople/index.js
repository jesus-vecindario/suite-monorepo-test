import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import {
	Button,
	Checkbox,
	Input,
	MessageError,
	RadioButton,
	TextTag,
	ToggleSwitch,
	useTranslate,
} from '@vecindario/vecindario-suite-components';
import { MODULE_OPTIONS_KEYS, getCurrentProject, getModulesByProject } from '@vecindario/suite-dashboard-layout-lib';
import { useTranslation } from 'react-i18next';
import { teamSchema } from '../../../../../domains/team/application/schemas';
import {
	addPeopleFields,
	ADVISER_ROLE,
	DIRECTOR_ROLE,
	MARKETING_ROLE,
	REQUIRED_MODULES_BY_ROLE,
} from '../../../../../domains/team/application/constants/addPeople';
import { ICON_ALARM } from '../../../../../domains/team/application/constants/icons';
import { filterModulesByRole } from '../../../../../domains/team/application/helpers/modules';
import { SET_VALUE_OPTIONS } from '../../../../../domains/project/application/helpers/validations';
import './FormAddPeople.scss';
import { DOMAIN_NAME as SHARED_DOMAIN } from '../../../../infrastructure/i18n/locales';
import { FORM_ADD_PEOPLE } from '../../../../infrastructure/i18n/locales/translation_keys';

const FormAddPeople = ({ handleAddPeople, isOnBoarding, selectedRol }) => {
	const currentProject = useSelector(getCurrentProject);
	const myModules = useSelector(getModulesByProject);
	const [selectedModules, setSelectedModules] = useState([]);
	const [selectAll, setSelectAll] = useState(false);
	const [currentRole, setCurrentRole] = useState(DIRECTOR_ROLE);
	const { t } = useTranslation();

	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		control,
		watch,
		setValue,
	} = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		resolver: yupResolver(teamSchema),
		defaultValues: {
			[addPeopleFields.ACCESS_ROLE]: currentRole,
			[addPeopleFields.MODULES]: [],
		},
	});

	const errorFieldEmail = useTranslate(errors[addPeopleFields.EMAIL]?.message, SHARED_DOMAIN);
	const errorFieldUsername = useTranslate(errors[addPeopleFields.USERNAME]?.message, SHARED_DOMAIN);
	const errorFieldAccessRole = useTranslate(errors[addPeopleFields.ACCESS_ROLE]?.message, SHARED_DOMAIN);
	const errorFieldModules = useTranslate(errors[addPeopleFields.MODULES]?.message, SHARED_DOMAIN);

	const titleTexTagProps = useMemo(() => {
		return {
			tag: isOnBoarding ? 'p' : 'h5',
			variant: `-body-sm`,
			fw: 'bold',
		};
	}, [isOnBoarding]);

	const modules = filterModulesByRole(currentRole, myModules);
	const moduleIds = useMemo(() => modules.map((module) => module.id), [modules]);

	const handleOnChangeRole = (value, onChange) => {
		setValue(addPeopleFields.MODULES, [], SET_VALUE_OPTIONS);
		setCurrentRole(value);
		onChange(value);
	};

	const handleOnChangeSelectAll = (event) => {
		const isActive = event.target.checked;
		setSelectAll(isActive);
		if (isActive) {
			setValue(addPeopleFields.MODULES, moduleIds, { shouldValidate: true });
			setSelectedModules(moduleIds);
		} else {
			setValue(addPeopleFields.MODULES, modules);
			setSelectedModules(modules);
		}
	};

	const handleOnChangeSelectedModules = (value, currentModulesList, onChange) => {
		if (currentModulesList.length === modules.length - 1) {
			setSelectAll(true);
		}

		if (!selectedModules.includes(value)) {
			currentModulesList.push(value);
		} else {
			currentModulesList = currentModulesList.filter((elem) => elem !== value);
		}

		setSelectedModules(currentModulesList);
		onChange(currentModulesList);
	};

	useEffect(() => {
		const requiredModulesIds = filterModulesByRole(currentRole, myModules)
			.filter((elem) => REQUIRED_MODULES_BY_ROLE[currentRole].includes(elem.name))
			.map((elem) => elem.id);
		setSelectedModules(requiredModulesIds);
		setValue(addPeopleFields.MODULES, requiredModulesIds, SET_VALUE_OPTIONS);
	}, [setValue, currentRole, myModules]);

	useEffect(() => {
		if (selectedModules.length === modules.length) {
			setSelectAll(true);
		}
		if (selectedModules.length !== modules.length) {
			setSelectAll(false);
		}
	}, [myModules.length, modules.length, selectedModules.length]);

	if (selectedRol) {
		selectedRol(watch(addPeopleFields.ACCESS_ROLE));
	}

	return (
		<form onSubmit={handleSubmit(handleAddPeople)} className="form-add-people">
			<div className="container-inputs">
				<Input
					label={t(FORM_ADD_PEOPLE.INPUT_EMAIL_LABEL, { ns: SHARED_DOMAIN })}
					{...register(addPeopleFields.EMAIL, {
						setValueAs: (email) => email?.toLowerCase(),
					})}
					placeholder={t(FORM_ADD_PEOPLE.INPUT_EMAIL_PLACEHOLDER, { ns: SHARED_DOMAIN })}
					error={errorFieldEmail}
				/>
				{currentProject?.agreement && (
					<div className="full-name">
						<Input
							label={t(FORM_ADD_PEOPLE.INPUT_NICKNAME_LABEL, { ns: SHARED_DOMAIN })}
							{...register(addPeopleFields.USERNAME)}
							error={errorFieldUsername}
							placeholder={t(FORM_ADD_PEOPLE.INPUT_NICKNAME_PLACEHOLDER, { ns: SHARED_DOMAIN })}
						/>
					</div>
				)}
			</div>
			<div className="person-rol">
				<TextTag {...titleTexTagProps} className="label-rol">
					{isOnBoarding
						? t(FORM_ADD_PEOPLE.TEXT_TAG_1, { ns: SHARED_DOMAIN })
						: t(FORM_ADD_PEOPLE.TEXT_TAG_2, { ns: SHARED_DOMAIN })}
				</TextTag>
				<div className="roles">
					<Controller
						name={addPeopleFields.ACCESS_ROLE}
						control={control}
						render={({ field }) => (
							<RadioButton.Group onChange={(value) => handleOnChangeRole(value, field.onChange)}>
								<RadioButton
									labelPosition="right"
									name={field.name}
									value={DIRECTOR_ROLE}
									label={t(FORM_ADD_PEOPLE.LABEL_DIRECTOR, { ns: SHARED_DOMAIN })}
									className="role"
									checked={field.value === DIRECTOR_ROLE}
								/>
								<RadioButton
									labelPosition="right"
									name={field.name}
									value={ADVISER_ROLE}
									label={t(FORM_ADD_PEOPLE.LABEL_ADVISER, { ns: SHARED_DOMAIN })}
									checked={field.value === ADVISER_ROLE}
								/>
								<RadioButton
									labelPosition="right"
									name={field.name}
									value={MARKETING_ROLE}
									label={t(FORM_ADD_PEOPLE.LABEL_MARKETING, { ns: SHARED_DOMAIN })}
									checked={field.value === MARKETING_ROLE}
								/>
							</RadioButton.Group>
						)}
					/>
				</div>
				{errors[addPeopleFields.ACCESS_ROLE] && (
					<div className="error-message">
						<MessageError message={errorFieldAccessRole} />
					</div>
				)}
			</div>
			<div className="container-modules">
				<TextTag {...titleTexTagProps} className="select-modules">
					{isOnBoarding
						? t(FORM_ADD_PEOPLE.TEXT_TAG_3, { ns: SHARED_DOMAIN })
						: t(FORM_ADD_PEOPLE.TEXT_TAG_4, { ns: SHARED_DOMAIN })}
				</TextTag>

				<div className="select-all">
					<ToggleSwitch onChange={handleOnChangeSelectAll} value={selectAll} />
					<TextTag variant="-body-sm">{t(FORM_ADD_PEOPLE.TEXT_TAG_5, { ns: SHARED_DOMAIN })}</TextTag>
				</div>

				<hr className="separator" />

				<Controller
					name={`${addPeopleFields.MODULES}`}
					control={control}
					render={({ field }) => {
						return modules.map((module, key) => (
							<Checkbox
								key={key}
								label={t(`${MODULE_OPTIONS_KEYS[module?.key?.toUpperCase()]?.PARSED_NAME}`, { ns: SHARED_DOMAIN })}
								onChange={(item) => handleOnChangeSelectedModules(item.target.value, field.value, field.onChange)}
								value={module.id}
								checked={selectedModules.some((id) => id === module.id)}
								disabled={REQUIRED_MODULES_BY_ROLE[currentRole].includes(module.name) && selectedModules.includes(module.id)}
								labelPosition="right"
								id={module.name}
							/>
						));
					}}
				/>

				{errors[addPeopleFields.MODULES] && (
					<div className="error-message">
						<MessageError message={errorFieldModules} />
					</div>
				)}
			</div>

			{!isOnBoarding && (
				<>
					<hr className="separator" />
					<div className="information-card">
						<i className={`${ICON_ALARM} icon-alert`} />
						<small>{t(FORM_ADD_PEOPLE.SMALL, { ns: SHARED_DOMAIN })}</small>
					</div>
				</>
			)}
			{isOnBoarding ? (
				<Button className={isValid ? 'form-button' : 'form-button -disabled'} type="submit" variant="default">
					{t(FORM_ADD_PEOPLE.BUTTON_1, { ns: SHARED_DOMAIN })}
				</Button>
			) : (
				<Button className={isValid ? 'form-button' : 'form-button -disabled'} type="submit" variant="default">
					{t(FORM_ADD_PEOPLE.BUTTON_2, { ns: SHARED_DOMAIN })}
				</Button>
			)}
		</form>
	);
};

FormAddPeople.propTypes = {
	handleAddPeople: PropTypes.func,
	isOnBoarding: PropTypes.bool,
	selectedRol: PropTypes.func,
};

export default FormAddPeople;
