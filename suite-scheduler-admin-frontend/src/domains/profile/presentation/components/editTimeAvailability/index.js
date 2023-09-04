import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';

import { setMessageToast } from '@vecindario/suite-dashboard-layout-lib';
import { Button, TextTag } from '@vecindario/vecindario-suite-components';
import DaysScheduler from '../../../../projectAvailability/presentation/components/daysScheduler';

import { getMyUserTimeAvailability } from '../../../../../shared/application/selectors/myProfile';
import { APPOINTMENT_TYPES, userDetailFields } from '../../../application/constants/myProfile';
import { userSchedulerSchema } from '../../../../dashboard/application/validations/myProfile';
import { updateProfile } from '../../../../../shared/application/slices/myProfile';
import {
	ERROR_ON_REQUEST,
	SUCCESS_UPDATE_REQUEST,
} from '../../../../../shared/application/constants/messages/error-messages';

import { fillRestDays } from '../../../../projectAvailability/application/helpers/project';
import { transformUserScheduleData } from '../../../../../shared/application/helpers/myProfile';
import { updateMyProfile } from '../../../infrastructure/api';

import { errorToast, successToast } from '../../../../../shared/application/helpers/toast';
import OptionCard from '../../../../projectAvailability/presentation/components/formMultiSelection/optionCard';
import FormMultiSelection from '../../../../projectAvailability/presentation/components/formMultiSelection';
import './EditTimeAvailability.scss';
import { getAppointmentType } from '../../../application/availability';

const EditTimeAvailability = () => {
	const userAvailability = useSelector(getMyUserTimeAvailability);
	const dispatch = useDispatch();
	const { slug } = useParams();

	const filledAvailability = useMemo(() => fillRestDays({ ...userAvailability.attention_days }), [userAvailability]);

	const {
		setValue,
		getValues,
		handleSubmit,
		register,
		reset,
		setError,
		clearErrors,
		formState: { errors, isDirty, isValid },
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(userSchedulerSchema),
		defaultValues: {
			[userDetailFields.TIME_AVAILABILITY]: filledAvailability,
			[userDetailFields.APPOINTMENT_TYPES]: getAppointmentType(userAvailability.appointment_type),
		},
	});

	const onSubmit = (data) => {
		const body = transformUserScheduleData(data);
		updateMyProfile(slug, body)
			.then((res) => {
				dispatch(updateProfile(res));
				dispatch(setMessageToast(successToast(SUCCESS_UPDATE_REQUEST)));
				reset({
					[userDetailFields.TIME_AVAILABILITY]: fillRestDays(res.user_time_availability),
					[userDetailFields.APPOINTMENT_TYPES]: getAppointmentType(res.appointment_type),
				});
			})
			.catch(() => {
				dispatch(setMessageToast(errorToast(ERROR_ON_REQUEST)));
			});
	};

	return (
		<div className="edit-time-availability">
			<h2 className="scheduler-title">Mi disponibilidad</h2>
			<p className="scheduler-description">Agenda y distribuye tus citas de una manera más eficiente y rápida</p>
			<form className="time-availability" onSubmit={handleSubmit(onSubmit)}>
				<div className="appointment-type">
					<FormMultiSelection
						setValue={setValue}
						labelText="Selecciona el tipo de agendamiento que desea tener"
						fieldName={userDetailFields.APPOINTMENT_TYPES}
						errors={errors}
						register={register}
						initialData={getAppointmentType(userAvailability.appointment_type)}
						setError={setError}
						clearErrors={clearErrors}
					>
						{APPOINTMENT_TYPES.map((option) => (
							<OptionCard key={option.value} option={option} />
						))}
					</FormMultiSelection>
				</div>

				<TextTag tag="p" fw="bold" variant="-body" className="schedule-message">
					Organiza el horario de tus días de atención
				</TextTag>
				<div className="day-scheduler">
					<DaysScheduler
						fieldName={userDetailFields.TIME_AVAILABILITY}
						errors={errors}
						setValue={setValue}
						getValue={getValues}
						initialData={filledAvailability}
						register={register}
					/>
				</div>

				<div className="footer-btn">
					<Button className="button-edit-time-availability" type="submit" variant="default" disabled={!isDirty || !isValid}>
						Guardar cambios
					</Button>
				</div>
			</form>
		</div>
	);
};

export default EditTimeAvailability;
