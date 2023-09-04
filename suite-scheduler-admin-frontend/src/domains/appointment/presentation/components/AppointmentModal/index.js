import React from 'react';
import PropTypes from 'prop-types';

import GeneralModal from '../../../../../shared/presentation/components/GeneralModal';
import './AppointmentModal.scss';

const AppointmentModal = ({ children, setOpen, isOpen }) => {
	const contentStyles = {
		maxWidth: '600px',
		maxHeight: '90vh',
	};

	return (
		<GeneralModal
			showClose={false}
			setIsOpen={setOpen}
			modalIsOpen={isOpen}
			modalContainerClass="adviser-link"
			closeClassName="close"
			contentStyles={contentStyles}
		>
			{children}
		</GeneralModal>
	);
};

AppointmentModal.propTypes = {
	children: PropTypes.node,
	setOpen: PropTypes.func,
	isOpen: PropTypes.bool,
};

export default AppointmentModal;
