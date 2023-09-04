import React from 'react';
import { Button, TextTag } from '@vecindario/vecindario-suite-components';
import { getCurrentProject, getCurrentUser, setMessageToast } from '@vecindario/suite-dashboard-layout-lib';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './IntegrationCard.scss';
import { INTEGRATION_LINK_LOGO } from '../../../../../tools/application/constants/images';
import { copyTextToClipboard } from '../../../../../../shared/application/helpers/common-functions';
import { adviserLinkAppointment } from '../../../../../linkAdviser/infrastructure/routes';
import { successToast } from '../../../../../../shared/application/helpers/toast';

const integrationData = {
	titleText: 'Link de contacto',
	descriptionText:
		'Utiliza esta herramienta para copiar en el portapapeles un link que podrás compartir a tus clientes y así generar agendamientos aprovechando la capacidad de todos los asesores del proyecto.',
	buttonText: 'Copiar Link',
	imageUrl: INTEGRATION_LINK_LOGO,
};
const SharedSchedulerLink = () => {
	const dispatch = useDispatch();
	const { slug } = useParams();
	const currentProject = useSelector(getCurrentProject);
	const currentUser = useSelector(getCurrentUser);

	const handleOpenProjectLink = () => {
		if (currentProject && currentUser) {
			copyTextToClipboard(`${origin}${adviserLinkAppointment(slug)}`).then(() => {
				dispatch(setMessageToast(successToast('Link copiado. Está en tu portapapeles')));
			});
		}
	};

	return (
		<div className="integration-card">
			<div className="card-wrapper">
				<div className="image-container">
					{integrationData.imageUrl && <img src={integrationData.imageUrl} className="logo" alt="" />}
				</div>
				<div className="txt-ctn">
					<TextTag tag="h3" fw="normal" variant="-body" className="title">
						{integrationData.titleText}
					</TextTag>
					<TextTag tag="p" fw="normal" variant="-body-sm" className="description">
						{integrationData.descriptionText}
					</TextTag>
				</div>
				<div className="btn-wrapper">
					<Button variant="default" className="rest-btn" onClick={handleOpenProjectLink}>
						{integrationData.buttonText}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default SharedSchedulerLink;
