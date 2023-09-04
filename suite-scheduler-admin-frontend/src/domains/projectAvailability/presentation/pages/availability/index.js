import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setMessageToast } from '@vecindario/suite-dashboard-layout-lib';
import { FooterSuite, Helmet } from '@vecindario/vecindario-suite-components';

import FormProject from '../../components/formProject';
import { transformProjectData } from '../../../application/helpers/project';
import { editProjectRequest } from '../../../infrastructure/api';
import { getProjectBySlug } from '../../../application/slices/project';
import {
	getProjectAvailabilityToEdit,
	getCurrentProject,
	getProjectRequested,
} from '../../../application/selectors/project';
import './Availability.scss';
import { errorToast, successToast } from '../../../../../shared/application/helpers/toast';

const Availability = () => {
	const dispatch = useDispatch();
	const { slug } = useParams();
	const projectAvailability = useSelector(getProjectAvailabilityToEdit);
	const currentProject = useSelector(getCurrentProject);
	const isLoaded = useSelector(getProjectRequested);

	const onSubmit = (body, setFormErrors) => {
		editProjectRequest(currentProject.slug, transformProjectData(body))
			.then(() => {
				dispatch(getProjectBySlug());
				dispatch(setMessageToast(successToast('Disponibilidad horaria actualizada correctamente')));
			})
			.catch((error) => {
				setFormErrors(error);
				dispatch(setMessageToast(errorToast('No se pudo actualizar, verifique la información ingresada')));
			});
	};

	useEffect(() => {
		dispatch(getProjectBySlug());
	}, [dispatch, slug]);

	return (
		<>
			<Helmet title={'Vecindario Suite - Gestor de calendarios - Herramientas'} />
			<div className="create_project">
				<div className="wrapper">{isLoaded && <FormProject submitForm={onSubmit} initialData={projectAvailability} />}</div>
				<FooterSuite />
			</div>
		</>
	);
};

export default Availability;
