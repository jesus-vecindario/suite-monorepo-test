import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Input, Modal, Spinner, TextTag, useTranslate } from '@vecindario/vecindario-suite-components';
import './ModalLocateProject.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getCitiesList } from '../../../../../application/selectors/locations';
import { INITIAL_LOCATION, projectFields } from '../../../../../application/constants/project';
import {
	callGeoCodeApiFindByAddress,
	validateField,
	validLocation,
} from '../../../../../application/helpers/geo-helper';
import { SET_VALUE_OPTIONS } from '../../../../../../domains/project/application/helpers/validations';
import { getFetchCities } from '../../../../../application/slices/locations';
import Map from '../../../Map';
import { ICON_INFORMATION } from '../../../../../application/constants/icons';
import AsyncSelect from '../AsyncSelect';
import { MODAL_LOCATE_PROJECT } from '../../../../../infrastructure/i18n/locales/translation_keys';
import { DOMAIN_NAME } from '../../../../../infrastructure/i18n/locales';

const ModalLocateProject = ({
	isModalOpen,
	setIsModalOpen,
	control,
	register,
	errors,
	setError,
	clearErrors,
	getValues,
	setValue,
	watch,
}) => {
	const dispatch = useDispatch();
	const cities = useSelector(getCitiesList).map((city) => ({ label: city, value: city }));
	const [location, setLocation] = useState(INITIAL_LOCATION);
	const [loading, setLoading] = useState(false);
	const [selectedCity, setSelectedCity] = useState(getValues(projectFields.CITY));
	const { t } = useTranslation();

	const handleLocation = (city, address, neighborhood) => {
		if (validateField(city) && validateField(address)) {
			const callBack = (res) => {
				if (validLocation(res)) {
					setLocation(res);
					setValue(projectFields.LOCATION, res, SET_VALUE_OPTIONS);
					setValue(projectFields.CITY, selectedCity, SET_VALUE_OPTIONS);
					setValue(projectFields.ADDRESS, getValues(projectFields.ADDRESS), SET_VALUE_OPTIONS);
					setValue(projectFields.NEIGHBORHOOD, getValues(projectFields.NEIGHBORHOOD), SET_VALUE_OPTIONS);
					clearErrors(projectFields.LOCATION);
					clearErrors(projectFields.CITY);
					setLoading(true);
					setTimeout(() => {
						setLoading(false);
						setIsModalOpen(false);
					}, 1500);
				} else {
					setError(projectFields.LOCATION, { type: 'manual', message: t(MODAL_LOCATE_PROJECT.ERROR, { ns: DOMAIN_NAME }) });
				}
			};
			callGeoCodeApiFindByAddress(`${address.replace(/#/g, '')} ${neighborhood || ''} ${city || ''}`, callBack);
		}
	};

	const fetchLocation = () => {
		handleLocation(selectedCity, getValues(projectFields.ADDRESS), getValues(projectFields.NEIGHBORHOOD));
	};

	const stylesModal = {
		backgroundColor: '#FFFFFF',
		width: '450px',
		height: '662px',
		maxHeight: '879px',
		padding: '60px 36px 36px',
	};

	const handleClose = () => {
		setIsModalOpen(false);
	};

	useEffect(() => {
		if (cities.length === 0) dispatch(getFetchCities());
	}, [dispatch, cities.length]);

	const defaultCity = selectedCity ? { label: selectedCity, value: selectedCity } : null;

	return (
		<Modal
			overlayStyle={{ overflow: 'hidden', zIndex: '2', backgroundColor: 'rgba(11, 29, 46, 0.8)' }}
			contentStyle={stylesModal}
			onClose={handleClose}
			isOpen={isModalOpen}
			showClose={true}
		>
			<div className="container-locate-project">
				<TextTag className="title">{t(MODAL_LOCATE_PROJECT.TEXT_TAG_1, { ns: DOMAIN_NAME })}</TextTag>
				<AsyncSelect
					defaultOptionValue={defaultCity}
					onSelectItem={(item) => setSelectedCity(item?.label)}
					label={t(MODAL_LOCATE_PROJECT.ASYNC_SELECT_LABEL, { ns: DOMAIN_NAME })}
				/>
				<Input
					{...register(projectFields.ADDRESS)}
					name={projectFields.ADDRESS}
					label={t(MODAL_LOCATE_PROJECT.INPUT_LABEL_1, { ns: DOMAIN_NAME })}
					required={true}
					error={useTranslate(errors[projectFields.ADDRESS]?.message)}
				/>
				<Input
					{...register(projectFields.NEIGHBORHOOD)}
					name={projectFields.NEIGHBORHOOD}
					label={t(MODAL_LOCATE_PROJECT.INPUT_LABEL_2, { ns: DOMAIN_NAME })}
					error={useTranslate(errors[projectFields.NEIGHBORHOOD]?.message)}
				/>
				<div className="container-map">
					<Map location={location} />
				</div>
				{errors[projectFields.LOCATION] && (
					<TextTag variant="-body-xs" className="error-location">
						<Icon icon={ICON_INFORMATION} />
						{errors[projectFields.LOCATION]?.message}
					</TextTag>
				)}
				<Button className={'form-button'} disabled={loading} type="submit" variant="default" onClick={fetchLocation}>
					{loading ? (
						<Spinner className="spinner-locate" size="medium" />
					) : (
						t(MODAL_LOCATE_PROJECT.BUTTON, { ns: DOMAIN_NAME })
					)}
				</Button>
			</div>
		</Modal>
	);
};

ModalLocateProject.propTypes = {
	isModalOpen: PropTypes.bool,
	setIsModalOpen: PropTypes.func,
	initialData: PropTypes.object,
	getValues: PropTypes.func,
	setValue: PropTypes.func,
	setError: PropTypes.func,
	clearErrors: PropTypes.func,
	control: PropTypes.any,
	register: PropTypes.func,
	errors: PropTypes.object,
	watch: PropTypes.func,
};

export default ModalLocateProject;
