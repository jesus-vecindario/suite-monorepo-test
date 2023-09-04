import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, TextTag } from '@vecindario/vecindario-suite-components';
import DaysScheduler from '../daysScheduler';

import { projectSchema, setManualError } from '../../../application/schemas/project';
import {
	defaultScheduleValues,
	PROJECT_SCHEDULE_TIME_OPTIONS,
	projectFields,
} from '../../../application/constants/project';

import './formProject.scss';
import OptionCard from '../formMultiSelection/optionCard';
import FormMultiSelection from '../formMultiSelection';

const FormProject = ({ initialData, submitForm }) => {
	const {
		register,
		setValue,
		setError,
		getValues,
		handleSubmit,
		setFocus,
		clearErrors,
		reset,
		formState: { errors, isDirty, isValid },
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(projectSchema),
	});

	const setFormErrors = (formErrors) => {
		Object.keys(formErrors).forEach((key) => {
			setFocus(key);
			setError(key, setManualError(formErrors[key]));
		});
	};

	const onSubmit = (data) => {
		submitForm(data, setFormErrors);
	};

	useEffect(() => {
		reset(initialData);
	}, [initialData, reset]);

	return (
		<div className="form-project">
			<TextTag tag="h2" fw="bold" className="title">
				Agéndate
			</TextTag>

			<TextTag tag="p" font="DM-sans" fw="normal" variant="-body-sm" className="description">
				Configura el horario del proyecto y la duración del tiempo por agendamiento al asesor
			</TextTag>

			<form className="form-wrapper" onSubmit={handleSubmit(onSubmit)}>
				<div className="form-field">
					<DaysScheduler
						title="Días de atención del proyecto"
						initialData={initialData[projectFields.ATTENTION_DAYS]}
						fieldName={projectFields.ATTENTION_DAYS}
						errors={errors}
						setValue={setValue}
						getValue={getValues}
						register={register}
					/>
				</div>

				<div className="form-field">
					<FormMultiSelection
						setValue={setValue}
						labelText="Elige el tiempo de permanencia con cada cliente por agendamiento"
						fieldName={projectFields.SCHEDULING_TIME}
						errors={errors}
						register={register}
						initialData={initialData[projectFields.SCHEDULING_TIME] || ''}
						setError={setError}
						clearErrors={clearErrors}
					>
						{PROJECT_SCHEDULE_TIME_OPTIONS.map((option) => (
							<OptionCard key={option.value} option={option} />
						))}
					</FormMultiSelection>
				</div>

				<div className="footer">
					<Button className="submit-btn" disabled={!isDirty || !isValid} type="submit" variant="default">
						Guardar cambios
					</Button>
				</div>
			</form>
		</div>
	);
};

FormProject.propTypes = {
	initialData: PropTypes.object,
	submitForm: PropTypes.func,
};

FormProject.defaultProps = {
	initialData: { attention_days: defaultScheduleValues },
};

export default FormProject;
