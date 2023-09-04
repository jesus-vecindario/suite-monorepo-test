import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, TextTag } from '@vecindario/vecindario-suite-components';
import GeneralModal from '../../../../../shared/presentation/components/GeneralModal';
import { SCHEDULE_STATUS } from '../../../application/constants/schedules';
import './ConfirmationModal.scss';

const ConfirmationModal = ({ setIsOpen, modalIsOpen, handleConfirmation, title, description, confirmationType }) => {
	const handleClick = useCallback(() => {
		handleConfirmation(confirmationType).then(() => {
			setIsOpen(false);
		});
	}, [confirmationType, handleConfirmation, setIsOpen]);

	const closeModal = useCallback(() => setIsOpen(false), [setIsOpen]);

	return (
		<GeneralModal
			setIsOpen={setIsOpen}
			modalIsOpen={modalIsOpen}
			overlayStyles={{
				backgroundColor: 'rgba(0, 0, 0, 0.4)',
			}}
			contentStyles={{
				width: '500px',
			}}
			showClose={false}
		>
			<div className="confirm-modal-container">
				<TextTag tag="h3" variant="-body" fw="bold" className="title">
					{title}
				</TextTag>
				<TextTag tag="p" fw="normal" variant="-body" className="description">
					{description}
				</TextTag>
				<div className="team-delete-actions">
					<Button variant="bordered" onClick={closeModal} className="back">
						Volver
					</Button>
					<Button variant="default" className="confirm" onClick={handleClick}>
						Aceptar
					</Button>
				</div>
			</div>
		</GeneralModal>
	);
};

const confirmationTypes = Object.values(SCHEDULE_STATUS);

ConfirmationModal.propTypes = {
	modalIsOpen: PropTypes.bool,
	setIsOpen: PropTypes.func,
	handleConfirmation: PropTypes.func,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	confirmationType: PropTypes.oneOf(confirmationTypes),
};

export default ConfirmationModal;
