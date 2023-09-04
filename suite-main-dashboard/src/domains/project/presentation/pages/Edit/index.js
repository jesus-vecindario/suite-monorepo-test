import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getCurrentProject,
	getProjectsByUser,
	setCurrentProject,
	setMessageToast,
} from '@vecindario/suite-dashboard-layout-lib';
import { useTranslation } from 'react-i18next';
import { FooterSuite, Helmet } from '@vecindario/vecindario-suite-components';
import { getProjectBySlug } from '../../../infrastructure';
import FormProject from '../../../../../shared/presentation/components/forms/project';
import './Edit.scss';
import PremiumModal from '../../../../../shared/presentation/components/PremiumModal';
import { EDIT } from '../../../infrastructure/locales/translation_keys';
import { DOMAIN_NAME } from '../../../infrastructure/locales';

const Edit = () => {
	const dispatch = useDispatch();
	const currentProject = useSelector(getCurrentProject);
	const [projectData, setProjectData] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const handleOpen = () => setModalOpen(!modalOpen);
	const { t } = useTranslation();

	const handleLock = () => {
		setModalOpen(true);
	};

	const handleOnSuccess = (data) => {
		dispatch(
			setMessageToast({
				type: 'success',
				message: t(EDIT.MESSAGE_SUCCESS, { ns: DOMAIN_NAME }),
			}),
		);
		dispatch(setCurrentProject(data));
		dispatch(getProjectsByUser());
	};

	const handleOnFailure = () => {
		dispatch(
			setMessageToast({
				type: 'error',
				message: t(EDIT.MESSAGE_ERROR, { ns: DOMAIN_NAME }),
			}),
		);
	};

	useEffect(() => {
		if (currentProject) {
			setProjectData({});
			getProjectBySlug(currentProject.slug).then((data) => {
				setProjectData({
					...data,
					city: data.city?.search_text,
					neighborhood: data.neighborhood?.name,
					logo: data.logo,
				});
			});
		}
	}, [currentProject]);

	return (
		<>
			<Helmet title={t(EDIT.HELMET_TITLE, { ns: DOMAIN_NAME })} />
			<div className="container-option-edit">
				<section className="section-body">
					{projectData?.slug && (
						<FormProject
							title={t(EDIT.FORM_PROJECT_TITLE, { ns: DOMAIN_NAME, titleProject: currentProject?.title })}
							subtitle={t(EDIT.FORM_PROJECT_SUBTITLE, { ns: DOMAIN_NAME })}
							onSucessSubmit={handleOnSuccess}
							handleOnFailure={handleOnFailure}
							initialProjectData={projectData}
							licenceType={currentProject?.licence_type}
							handleLock={handleLock}
						/>
					)}
				</section>
				<FooterSuite />
			</div>
			<PremiumModal isModalOpen={modalOpen} setIsModalOpen={handleOpen} />
		</>
	);
};

export default Edit;
