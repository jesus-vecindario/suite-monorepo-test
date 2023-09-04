import React, { useRef, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { MODULE_OPTIONS_KEYS, getCurrentProject, getModulesByProject } from '@vecindario/suite-dashboard-layout-lib';
import {
	Button,
	Checkbox,
	MessageError,
	Modal,
	RadioButton,
	TextTag,
	ToggleSwitch,
	useTranslate,
} from '@vecindario/vecindario-suite-components';
import { useTranslation } from 'react-i18next';
import { addPeopleFields, ADVISER_ROLE, DIRECTOR_ROLE, MARKETING_ROLE } from '../../../application/constants/addPeople';
import { deleteTeam, putTeam } from '../../../application/slices/team';
import { teamEditSchema } from '../../../application/schemas';
import { SUITE_MODULES } from '../../../../../shared/application/constants/project';
import './ModalEditPerson.scss';
import { filterModulesByRole } from '../../../application/helpers/modules';
import { LICENCE_FREE_PLAN } from '../../../../../shared/application/constants/premium';
import { DOMAIN_NAME as SHARED_DOMAIN } from '../../../../../shared/infrastructure/i18n/locales';
import { MODAL_EDIT_PERSON } from '../../../infrastructure/locales/translation_keys';
import { DOMAIN_NAME } from '../../../infrastructure/locales';

// TODO - Unify forms to add people - JUST THE FORM SECTION - VALIDATE IF IT SHOULD SHOW/HIDE EMAIL FIELD
const ModalEditPerson = ({
	projectAccessId,
	name,
	isModalOpen,
	setIsModalOpen,
	myModules,
	role,
	listTeamRole,
	openPremiumModal,
}) => {
	const userModules = useSelector(getModulesByProject);
	const dispatch = useDispatch();
	const refsModules = useRef([]);
	const [selectAll, setSelectAll] = useState(false);
	const currentProject = useSelector(getCurrentProject);
	const isFree = currentProject?.licence_type === LICENCE_FREE_PLAN;
	const { t } = useTranslation();

	const stylesModal = {
		backgroundColor: '#FFFFFF',
		width: '612px',
		height: 'max-content',
		maxHeight: '90vh',
		padding: '60px 32px 32px',
	};

	const {
		formState: { isValid, errors },
		handleSubmit,
		control,
		reset,
		watch,
		setValue,
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(teamEditSchema),
		defaultValues: {
			[addPeopleFields.ACCESS_ROLE]: role,
		},
	});

	const currentRole = watch()[addPeopleFields.ACCESS_ROLE];

	const filteredModules = useMemo(() => filterModulesByRole(currentRole, userModules), [currentRole, userModules]);

	const errorFieldAccessRole = useTranslate(errors[addPeopleFields.ACCESS_ROLE]?.message, SHARED_DOMAIN);
	const errorFieldModules = useTranslate(errors[addPeopleFields.MODULES]?.message, SHARED_DOMAIN);

	useEffect(() => {
		if (refsModules.current.length > 0) {
			if (currentRole !== MARKETING_ROLE) {
				const elementsRef = refsModules.current;
				const elementIndexBO = elementsRef.findIndex((item) => {
					return item.id === SUITE_MODULES.BUSINESS_OPPORTUNITIES || item.id === SUITE_MODULES.LANDING_BUILDER_MODULE;
				});
				const elementBO = elementsRef[elementIndexBO];
				const data = myModules.some((item) => item.id === elementBO?.value);
				if (elementBO) elementBO.disabled = false;
				if (currentRole === ADVISER_ROLE) {
					if (!data && !elementBO?.checked) {
						elementBO?.click();
					}
					if (elementBO) elementBO.disabled = true;
				} else {
					if (!data && elementBO?.checked) {
						elementBO?.click();
					}

					refsModules.current = [];
				}
			} else {
				refsModules.current = [];
			}
		}
	}, [currentRole, myModules]);

	const handleClose = () => {
		setIsModalOpen(false);
		reset();
	};

	const handleEditPeople = (values) => {
		if (isFree && role !== currentRole && listTeamRole[currentRole].length > 0) {
			handleClose();
			openPremiumModal(true);
		} else {
			const payload = { ...values, [addPeopleFields.MODULES]: values[addPeopleFields.MODULES].filter((item) => item) };
			dispatch(putTeam({ projectAccessId, payload }));
			handleClose();
		}
	};

	const handleDeletePeople = () => {
		dispatch(deleteTeam(projectAccessId));
		handleClose();
	};

	const setRef = (el) => {
		if (el) {
			if (!refsModules.current.some((item) => item.id === el.id)) {
				refsModules.current.push(el);
			}
		}
	};

	const validAsesor = (moduleName) => {
		return currentRole === ADVISER_ROLE && moduleName === SUITE_MODULES.BUSINESS_OPPORTUNITIES;
	};

	const userModuleIds = useMemo(() => myModules.map((item) => item.id), [myModules]);

	const moduleIds = useMemo(() => filteredModules.map((module) => module.id), [filteredModules]);

	const handleChange = (event) => {
		const isActive = event.target.checked;
		setSelectAll(isActive);
		if (isActive) {
			setValue(addPeopleFields.MODULES, moduleIds);
		} else {
			setValue(addPeopleFields.MODULES, userModuleIds);
		}
	};

	useEffect(() => {
		if (myModules.length === filteredModules.length) {
			setSelectAll(true);
		}
	}, [myModules, filteredModules.length]);

	const [toggleDisable, setToggleDisable] = useState(false);

	const fieldsCheck = watch(addPeopleFields.MODULES);

	useEffect(() => {
		if (userModuleIds.length === moduleIds.length) {
			if (moduleIds.length === fieldsCheck?.length) {
				setToggleDisable(true);
			} else {
				setToggleDisable(false);
			}
		}
	}, [userModuleIds.length, moduleIds.length, fieldsCheck?.length]);

	return (
		<Modal
			overlayStyle={{ overflow: 'hidden', zIndex: '2', backgroundColor: 'rgba(11, 29, 46, 0.8)' }}
			contentStyle={stylesModal}
			onClose={handleClose}
			isOpen={isModalOpen}
			showClose={true}
		>
			<div className="container-edit-person">
				<h5 className="title-edit">
					{t(MODAL_EDIT_PERSON.H5_1, { ns: DOMAIN_NAME })} <span className="name">{name}</span>
				</h5>
				<p className="description-edit">{t(MODAL_EDIT_PERSON.DESCRIPTION_EDIT, { ns: DOMAIN_NAME })}</p>
				<form onSubmit={handleSubmit(handleEditPeople)} className="form-edit-person">
					<div className="person-rol">
						<h5>{t(MODAL_EDIT_PERSON.H5_2, { ns: DOMAIN_NAME })}</h5>
						<Controller
							name={addPeopleFields.ACCESS_ROLE}
							control={control}
							render={({ field }) => (
								<RadioButton.Group onChange={(value) => field.onChange(value)}>
									<RadioButton
										labelPosition="right"
										name={field.name}
										value={DIRECTOR_ROLE}
										label={t(MODAL_EDIT_PERSON.DIRECTOR, { ns: DOMAIN_NAME })}
										{...(field.value === DIRECTOR_ROLE && { checked: true })}
									/>
									<RadioButton
										labelPosition="right"
										name={field.name}
										value={ADVISER_ROLE}
										label={t(MODAL_EDIT_PERSON.ADVISER, { ns: DOMAIN_NAME })}
										{...(field.value === ADVISER_ROLE && { checked: true })}
									/>
									<RadioButton
										labelPosition="right"
										name={field.name}
										value={MARKETING_ROLE}
										label={t(MODAL_EDIT_PERSON.MARKETING, { ns: DOMAIN_NAME })}
										{...(field.value === MARKETING_ROLE && { checked: true })}
									/>
								</RadioButton.Group>
							)}
						/>
						{errors[addPeopleFields.ACCESS_ROLE] && (
							<div className="error-message">
								<MessageError message={errorFieldAccessRole} />
							</div>
						)}
					</div>
					<div className="container-modules">
						<h5 className="select-modules">{t(MODAL_EDIT_PERSON.MODULES_SELECT, { ns: DOMAIN_NAME })}</h5>
						<div className="select-all">
							<ToggleSwitch disabled={toggleDisable} value={selectAll} onChange={handleChange} />
							<TextTag variant="-body-sm">{t(MODAL_EDIT_PERSON.MODULES_SELECT_ALL, { ns: DOMAIN_NAME })}</TextTag>
						</div>
						<hr className="separator" />
						<Controller
							name={`${addPeopleFields.MODULES}`}
							control={control}
							defaultValue={userModuleIds}
							render={({ field }) => {
								return filteredModules.map((module, key) => (
									<Checkbox
										key={key}
										label={t(`${MODULE_OPTIONS_KEYS[module.key?.toUpperCase()]?.PARSED_NAME}`, { ns: SHARED_DOMAIN })}
										onChange={(item) => {
											if (!item.target.checked) {
												setSelectAll(false);
											} else if (field.value.length === filteredModules.length - 1) {
												setSelectAll(true);
											}
											field.onChange(
												item.target.checked
													? field.value.concat(item.target.value)
													: field.value.filter((valueItem) => valueItem !== item.target.value),
											);
										}}
										value={module.id}
										checked={field.value.some((id) => id === module.id) || validAsesor(module.name)}
										labelPosition="right"
										defaultChecked={myModules.some((item) => item.id === module.id) || validAsesor(module.name)}
										disabled={validAsesor(module.name)}
										id={module.name}
										ref={(el) => setRef(el)}
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

					<hr className="separator" />
					<div className="container-buttons">
						<Button type="button" onClick={handleDeletePeople} variant="bordered">
							{t(MODAL_EDIT_PERSON.BUTTON_1, { ns: DOMAIN_NAME })}
						</Button>
						<Button className={isValid ? 'form-button' : 'form-button -disabled'} type="submit" variant="default">
							{t(MODAL_EDIT_PERSON.BUTTON_2, { ns: DOMAIN_NAME })}
						</Button>
					</div>
				</form>
			</div>
		</Modal>
	);
};

ModalEditPerson.propTypes = {
	projectAccessId: PropTypes.string,
	name: PropTypes.string,
	isModalOpen: PropTypes.bool,
	setIsModalOpen: PropTypes.func,
	myModules: PropTypes.array,
	role: PropTypes.string,
	listTeamRole: PropTypes.object,
	openPremiumModal: PropTypes.func,
};

export default ModalEditPerson;
