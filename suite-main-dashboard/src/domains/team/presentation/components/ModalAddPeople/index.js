import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, TextTag } from '@vecindario/vecindario-suite-components';
import './ModalAddPeople.scss';

import { getCurrentProject } from '@vecindario/suite-dashboard-layout-lib';
import { useTranslation } from 'react-i18next';
import { addPeopleFields } from '../../../application/constants/addPeople';
import { postTeam } from '../../../application/slices/team';
import { checkCookieExistence } from '../../../../../shared/application/helpers/common-functions';
import { LAST_SELECTED_SLUG } from '../../../../../shared/application/constants/cookiesKeys';
import FormAddPeople from '../../../../../shared/presentation/components/forms/FormAddPeople';
import { LICENCE_FREE_PLAN } from '../../../../../shared/application/constants/premium';
import { MODAL_ADD_PEOPLE } from '../../../infrastructure/locales/translation_keys';
import { DOMAIN_NAME } from '../../../infrastructure/locales';

const ModalAddPeople = ({ isModalOpen, setIsModalOpen, openPremiumModal, listTeamRole }) => {
	const currentProject = useSelector(getCurrentProject);
	const [selectedRol, setSelectedRol] = useState('');
	const isFree = currentProject?.licence_type === LICENCE_FREE_PLAN;
	const { t } = useTranslation();

	const dispatch = useDispatch();
	const stylesModal = {
		backgroundColor: '#FFFFFF',
		width: '612px',
		height: '100%',
		maxHeight: '90vh',
		padding: '54px 34px',
	};

	const handleClose = () => {
		setIsModalOpen(false);
	};

	const handleAddPeople = (values) => {
		if (isFree && listTeamRole[selectedRol]?.length > 0) {
			handleClose();
			openPremiumModal(true);
		} else {
			const slug = currentProject?.slug || checkCookieExistence(LAST_SELECTED_SLUG);
			const payload = { ...values, [addPeopleFields.MODULES]: values[addPeopleFields.MODULES].filter((item) => item) };
			dispatch(postTeam({ slug, payload }));
			handleClose();
		}
	};

	return (
		<Modal
			overlayStyle={{ overflow: 'hidden', zIndex: '2', backgroundColor: 'rgba(11, 29, 46, 0.8)' }}
			contentStyle={stylesModal}
			onClose={handleClose}
			isOpen={isModalOpen}
			showClose={true}
		>
			<div className="container-add-people">
				<TextTag fw="bold" className="title-add">
					{t(MODAL_ADD_PEOPLE.TEX_TAG_1, { ns: DOMAIN_NAME })}
				</TextTag>
				<p className="description-add">{t(MODAL_ADD_PEOPLE.DESCRIPTION, { ns: DOMAIN_NAME })}</p>
				<FormAddPeople handleAddPeople={handleAddPeople} selectedRol={setSelectedRol} />
			</div>
		</Modal>
	);
};

ModalAddPeople.propTypes = {
	isModalOpen: PropTypes.bool,
	setIsModalOpen: PropTypes.func,
	openPremiumModal: PropTypes.func,
	listTeamRole: PropTypes.object,
};

export default ModalAddPeople;
