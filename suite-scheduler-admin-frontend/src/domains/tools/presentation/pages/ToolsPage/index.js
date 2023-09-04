import React, { useEffect, useState } from 'react';
import { Button, FooterSuite, Helmet, TextTag } from '@vecindario/vecindario-suite-components';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getCurrentProject, getCurrentUser } from '@vecindario/suite-dashboard-layout-lib';
import EmbededScheduler from '../../../../dashboard/presentation/components/Integration/EmbededScheduler';
import {
	COMMENTS_STEP1_SCHEDULER,
	COMMENTS_STEP2_SCHEDULER,
} from '../../../../dashboard/application/constants/integration';

import './ToolsPage.scss';
import { INTEGRATION_LOGO } from '../../../application/constants/images';
import IntegrationCard from '../../../../dashboard/presentation/components/Integration/IntegrationCard';
import SharedSchedulerLink from '../../../../dashboard/presentation/components/Integration/IntegrationCard/sharedSchedulerLink';
import ModalPreviewScheduler from '../../../../dashboard/presentation/components/Integration/ModalPreviewScheduler';
import { dashboardScheduleRoute } from '../../../../dashboard/infrastructure/routes';
import { ASESOR_ROLE, SUPER_ADMIN_ROLE } from '../../../../projectAvailability/application/constants/project';

const ToolsPage = () => {
	const [isOpenModalPreview, setIsOpenModalPreview] = useState(false);
	const currentProject = useSelector(getCurrentProject);
	const currentUser = useSelector(getCurrentUser);
	const history = useHistory();

	useEffect(() => {
		if (currentProject?.role === ASESOR_ROLE && !currentUser?.user_roles?.includes(SUPER_ADMIN_ROLE)) {
			history.push(dashboardScheduleRoute(currentProject.slug));
		}
	}, [currentProject, currentUser?.user_roles, history]);

	const integrations = [
		{
			titleText: 'Obtén tu código para la web',
			descriptionText:
				'Esta integración permite incrustar un agendador en tu sitio web, el cual va a tener todo el inventario de inmuebles disponibles para que puedas generar oportunidades más calificadas.',
			buttonText: 'Ver pasos',
			component: <EmbededScheduler commentsStep1={COMMENTS_STEP1_SCHEDULER} commentsStep2={COMMENTS_STEP2_SCHEDULER} />,
			imageUrl: INTEGRATION_LOGO,
			buttonAction: (
				<Button variant="default" className="rest-btn" onClick={() => setIsOpenModalPreview(!isOpenModalPreview)}>
					Vista previa
				</Button>
			),
		},
	];

	return (
		<>
			<Helmet title={'Vecindario Suite - Gestor de calendarios - Herramientas'} />
			<div className="tools-page-container">
				<div className="wrapper">
					<TextTag tag="h2" fw="bold" className="title">
						Herramientas
					</TextTag>

					<TextTag tag="p" fw="normal" variant="-body-sm" className="description">
						Aquí podrás obtener el código para que uses en tu página web
					</TextTag>

					<div className="accordion-wrapper">
						{integrations.map((integration, index) => (
							<IntegrationCard key={index} {...integration} />
						))}
					</div>
					<div className="accordion-wrapper">
						<SharedSchedulerLink />
					</div>
				</div>
				<FooterSuite />
			</div>
			<ModalPreviewScheduler isOpenModal={isOpenModalPreview} closeModal={setIsOpenModalPreview} />
		</>
	);
};

export default ToolsPage;
