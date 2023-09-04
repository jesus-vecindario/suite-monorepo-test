import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Button } from '@vecindario/vecindario-suite-components';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { newAppointmentFields } from '../../../../dashboard/application/constants/appointment';
import newAppointmentSchema from '../../../../dashboard/application/validations/appointment';
import DayPicker from '../../../../dashboard/presentation/components/DayPicker';
import DateType from './DateType';
import {
	clearSelectedValues,
	getAvailabilityOnDay,
	makeAppointment,
	setFormData,
} from '../../../../../shared/application/slices/appointment';
import HourSelector from './HourSelector';
import { getClosingDays } from '../../../../projectAvailability/application/selectors/project';
import { getUserUnavailableDays } from '../../../../../shared/application/selectors/myProfile';
import { getMyAvailability } from '../../../../../shared/application/slices/myProfile';
import { isEmptyObject } from '../../../../../shared/application/helpers/common-functions';
import PhoneInput from '../../../../../shared/presentation/components/PhoneInput';
import { getProjectBySlug } from '../../../../projectAvailability/application/slices/project';
import './NewAppointment.scss';

const NewAppointment = ({ initialData, handleAppointmentRescheduled }) => {
	const dispatch = useDispatch();
	const { slug } = useParams();
	const loadingMakeAppointment = useSelector(({ appointment }) => appointment?.loadingMakeAppointment);

	const { [newAppointmentFields.SLUG]: selectedSlug } = useSelector((state) => state?.appointment);

	const projectClosingDays = useSelector(getClosingDays(selectedSlug));
	const userUnavailableDays = useSelector(getUserUnavailableDays);
	const userTimeAvailabilityRequested = useSelector(
		({ myProfile }) => myProfile?.profile?.userTimeAvailabilityRequested,
	);

	const CREATE_SUCCESS = 'Agendamiento creado exitosamente.';
	const RESCHEDULED_SUCCESS = 'Agendamiento reagendado exitosamente.';

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		setValue,
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(newAppointmentSchema),
		defaultValues: { ...initialData },
	});

	useEffect(() => {
		dispatch(getProjectBySlug());
		return () => {
			dispatch(clearSelectedValues());
		};
	}, [dispatch]);

	useEffect(() => {
		if (!userTimeAvailabilityRequested && slug) {
			dispatch(getMyAvailability(slug));
		}
	}, [dispatch, userTimeAvailabilityRequested, slug]);

	useEffect(() => {
		if (slug) dispatch(setFormData({ [newAppointmentFields.SLUG]: slug }));
	}, [slug, dispatch]);

	const onSubmit = (data) => {
		if (!loadingMakeAppointment) {
			dispatch(setFormData({ [newAppointmentFields.SLUG]: slug, ...data }));
			dispatch(makeAppointment(isEmptyObject(initialData) ? CREATE_SUCCESS : RESCHEDULED_SUCCESS));
			handleAppointmentRescheduled();
		}
	};

	const handleChangeDay = (day, hookFormField) => {
		const parsedDay = day ? moment(day).format('YYYY-MM-DD') : '';
		dispatch(setFormData({ [newAppointmentFields.DATE_DAY]: parsedDay }));
		hookFormField?.onChange(parsedDay);
		if (selectedSlug && parsedDay) {
			dispatch(getAvailabilityOnDay(parsedDay));
		}
	};

	const dayPickerProps = () => {
		const today = new Date();
		const year = today.getFullYear();
		const month = today.getMonth();
		const union = [...new Set([...projectClosingDays, ...userUnavailableDays])];
		return {
			disabledDays: [{ daysOfWeek: union }, { before: today }],
			fromMonth: new Date(year, month),
		};
	};

	const inputProps = (name, label, placeholder = null) => {
		return {
			label,
			error: errors[name]?.message,
			showIconError: false,
			placeholder: placeholder || label,
			disabled: !!initialData[name],
			...register(name),
			errorClassName: 'input-error-message',
		};
	};

	return (
		<div className="new-appointment-container">
			<h4 className="title font-title f-w-500 margin-bottom-6">
				{isEmptyObject(initialData) ? 'Nuevo agendamiento' : 'Reagendar cita'}
			</h4>
			<form className="new-appointment-form" onSubmit={handleSubmit(onSubmit)}>
				<div className="wrapper-inputs">
					<Input {...inputProps(newAppointmentFields.NAME, 'Nombre', 'Nombre del cliente')} />

					<Input {...inputProps(newAppointmentFields.LASTNAME, 'Apellido', 'Apellido del cliente')} />
				</div>

				<PhoneInput
					error={errors[newAppointmentFields.MOBILE]?.message}
					fieldName={newAppointmentFields.MOBILE}
					control={control}
					label="Telefono celular del cliente"
				/>

				<Input {...inputProps(newAppointmentFields.EMAIL, 'Correo electrónico')} />

				<DateType
					appointmentType={initialData[newAppointmentFields.DATE_TYPE] || ''}
					setValue={setValue}
					control={control}
					errors={errors}
				/>

				<p className="subtitle">Selecciona la fecha de la cita</p>

				<DayPicker subscribe={handleChangeDay} {...dayPickerProps()} control={control} errors={errors} />

				<HourSelector errors={errors} control={control} />

				<div className="divider" />

				<Button type="submit" variant="default" className="submit-btn" disabled={loadingMakeAppointment}>
					Guardar agendamiento
				</Button>
			</form>
		</div>
	);
};

NewAppointment.propTypes = {
	initialData: PropTypes.object,
	handleAppointmentRescheduled: PropTypes.func,
};

NewAppointment.defaultProps = {
	initialData: {},
	handleAppointmentRescheduled: () => {},
};

export default NewAppointment;
