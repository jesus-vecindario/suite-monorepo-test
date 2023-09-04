import React, { Children, useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import { ICON_CLOSE } from '../../../application/constants/icons';
import './GeneralModal.scss';

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#root');

const GeneralModal = ({
	children,
	modalContainerClass,
	modalIsOpen,
	setIsOpen,
	contentStyles,
	overlayStyles,
	showClose,
	closeClassName,
}) => {
	const extrasForChildRef = useRef({});
	const [isCloseAnimation, setisCloseAnimation] = useState(false);

	const customStyles = useCallback(() => {
		return {
			content: {
				top: 'auto',
				left: 'auto',
				right: 'auto',
				bottom: 'auto',
				padding: '4rem 3rem',
				border: 'none',
				borderRadius: '15px',
				maxWidth: '800px',
				width: '100%',
				// maxHeight: '80vh',
				overflow: 'visible',
				boxShadow: '0px 0px 11px 7px rgba(0, 0, 0, 0.05)',
				animationName: isCloseAnimation ? 'fadeOut' : 'fadeIn',
				animationDuration: '0.8s',
				animationFillMode: 'both',
				...contentStyles,
			},
			overlay: {
				zIndex: '10',
				backgroundColor: 'rgba(11, 29, 46, 0.5)',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				...overlayStyles,
			},
		};
	}, [isCloseAnimation, contentStyles, overlayStyles]);

	useEffect(() => {
		if (modalIsOpen) {
			document.body.style.overflow = 'hidden';
		}
		return () => {
			document.body.style.overflow = 'auto';
			setisCloseAnimation(false);
		};
	}, [modalIsOpen]);

	const closeModal = useCallback(() => {
		setisCloseAnimation(true);
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
			<ReactModal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles(isCloseAnimation)}>
				<div className={`scheduler-general-modal ${modalContainerClass}`}>
					{showClose && (
						<i className={`scheduler-general-modal-icon ${ICON_CLOSE} ${closeClassName}`} onClick={closeModal}></i>
					)}
					{Children.map(children, (child) => (
						<>{React.cloneElement(child, extrasForChildRef.current)}</>
					))}
				</div>
			</ReactModal>
		</>
	);
};

GeneralModal.propTypes = {
	modalIsOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
	children: PropTypes.node,
	modalContainerClass: PropTypes.string,
	hideOpenButton: PropTypes.bool,
	contentStyles: PropTypes.object,
	overlayStyles: PropTypes.object,
	showClose: PropTypes.bool,
	closeClassName: PropTypes.string,
};

GeneralModal.defaultProps = {
	modalContainerClass: '',
	showClose: true,
	closeClassName: '',
};

export default GeneralModal;
