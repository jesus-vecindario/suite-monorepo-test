import { Helmet } from '@vecindario/vecindario-suite-components';
import { getCurrentProject } from '@vecindario/suite-dashboard-layout-lib';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SCHEDULER_EMBEDDED } from '../../../../../shared/application/constants/env';
import './PreviewScheduler.scss';
import {
	importResource,
	removeMultipleResources,
	removeResource,
} from '../../../../../shared/application/helpers/common-functions';
import { useQuery } from '../../../../../shared/application/hooks/useQuery';

const PreviewScheduler = () => {
	const { slug } = useParams();
	const adviserEmail = useQuery('asesor_email');
	const currentProject = useSelector(getCurrentProject);

	useEffect(() => {
		setTimeout(() => {
			importResource({
				id: 'scheduler-embeded-by-vecindario',
				script: SCHEDULER_EMBEDDED,
			});
		}, 10);
		return () => {
			removeResource('#scheduler-embeded-by-vecindario');
			removeMultipleResources('.script-my-suite-scheduler');
			removeMultipleResources('.style-my-suite-scheduler');
		};
	}, []);

	return (
		<>
			<Helmet title={`Vecindario Suite - ${currentProject?.title || slug} - Agendar`} />
			<div className="col-12 mt-3 preview-simulator">
				<div id="agendadorByVecindario" data-projectslug={slug} data-adviseremail={adviserEmail}>
					<div className="d-flex justify-content-center">
						<i className="fal fa-2x fa-spinner fa-spin mx-auto"></i>
					</div>
				</div>
			</div>
		</>
	);
};

export default PreviewScheduler;
