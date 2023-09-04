import React from 'react';
import PropTypes from 'prop-types';
import PreviewScheduler from '../../../../../linkAdviser/presentation/components/PreviewScheduler';
import GeneralModal from '../../../../../../shared/presentation/components/GeneralModal';

import './ModalPreview.scss';

const ModalPreviewScheduler = ({ isOpenModal, closeModal }) => {
	if (!isOpenModal) return null;

	return (
		<GeneralModal
			modalIsOpen={isOpenModal}
			setIsOpen={closeModal}
			contentStyles={{ overflow: 'auto', padding: '3rem 2rem', maxHeight: '90vh' }}
			modalContainerClass="modal-scheduler-preview"
		>
			<PreviewScheduler />
		</GeneralModal>
	);
};

ModalPreviewScheduler.propTypes = {
	isOpenModal: PropTypes.bool.isRequired,
	closeModal: PropTypes.func.isRequired,
};

export default ModalPreviewScheduler;
