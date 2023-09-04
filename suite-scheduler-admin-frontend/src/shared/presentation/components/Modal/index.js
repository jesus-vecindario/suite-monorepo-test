import React, { Children, useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import './Modal.scss';
import { ICON_CLOSE } from '../../../application/constants/icons';

const LateralModal = ({ children, modalContainerClass, modalIsOpen, setIsOpen, contentStyles }) => {
	const extrasForChildRef = useRef({});
	const [isCloseAnimation, setIsCloseAnimation] = useState(false);

	const customStyles = useCallback(() => {
		return {
			content: {
				top: '0',
				left: 'auto',
				right: '0',
				bottom: '0',
				padding: '4.8rem',
				paddingRight: '.4rem',
				border: 'none',
				margin: '0',
				overflow: 'visible',
				backgroundColor: 'white',
				animationName: isCloseAnimation ? 'fadeOutRight' : 'fadeInRight',
				animationDuration: '0.8s',
				animationFillMode: 'both',
				borderRadius: '4px 0px 0px 4px',
				boxShadow: '0px 0px 11px 7px rgba(0, 0, 0, 0.05)',
				...contentStyles,
			},
			overlay: {
				zIndex: '10',
				backgroundColor: 'rgba(11, 29, 46, 0.5)',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			},
		};
	}, [isCloseAnimation, contentStyles]);

	useEffect(() => {
		if (modalIsOpen) {
			document.body.style.overflow = 'hidden';
		}
		return () => {
			document.body.style.overflow = 'auto';
			setIsCloseAnimation(false);
		};
	}, [modalIsOpen]);

	const closeModal = useCallback(() => {
		setIsCloseAnimation(true);
		setTimeout(() => {
			setIsOpen(false);
		}, 600);
	}, [setIsOpen]);

	useEffect(() => {
		if (setIsOpen) {
			extrasForChildRef.current = { isModal: modalIsOpen, closeParentModal: closeModal };
		}
	}, [closeModal, modalIsOpen, setIsOpen]);

	return (
		<>
			<ReactModal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles(isCloseAnimation)}
				appElement={document.querySelector('#root')}
			>
				<div className={`scheduler-modal-container ${modalContainerClass}`}>
					<i className={`scheduler-modal-icon fw-200 color-secondary -close ${ICON_CLOSE}`} onClick={closeModal}></i>
					{Children.map(children, (child) => (
						<>{React.cloneElement(child, extrasForChildRef.current)}</>
					))}
				</div>
			</ReactModal>
		</>
	);
};

LateralModal.propTypes = {
	modalIsOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
	modalContainerClass: PropTypes.string,
	contentStyles: PropTypes.object,
};

LateralModal.defaultProps = {
	modalContainerClass: '',
	contentStyles: {},
};

export default LateralModal;
