import React from 'react';
import { InformativeCard, Modal } from '@vecindario/vecindario-suite-components';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { LINK_GO_PREMIUM } from '../../../application/constants/premium';
import { DOMAIN_NAME } from '../../../infrastructure/i18n/locales';
import { PREMIUM_MODAL } from '../../../infrastructure/i18n/locales/translation_keys';

const PremiumModal = ({ isModalOpen, setIsModalOpen, title, description }) => {
	const { t } = useTranslation();
	const stylesModal = {
		width: '450px',
		height: '456px',
		borderRadius: '23px',
		border: 'none',
		padding: '0px',
	};
	const handleActionClose = () => {
		setIsModalOpen(false);
	};
	const handleActionPremium = () => {
		window.open(LINK_GO_PREMIUM, '_blank');
	};
	return (
		<Modal
			overlayStyle={{
				overflow: 'hidden',
				zIndex: '2',
				backgroundColor: 'rgba(11, 29, 46, 0.8)',
			}}
			contentStyle={stylesModal}
			onClose={setIsModalOpen}
			isOpen={isModalOpen}
			showClose={false}
		>
			<InformativeCard
				bodyText={description || t(PREMIUM_MODAL.BODY_TEXT, { ns: DOMAIN_NAME })}
				showIconClose={true}
				handleActionClose={handleActionClose}
				handleClick={handleActionPremium}
				titleText={
					title || (
						<>
							{t(PREMIUM_MODAL.TITLE_TEXT_1, { ns: DOMAIN_NAME })}
							<br />
							{t(PREMIUM_MODAL.TITLE_TEXT_2, { ns: DOMAIN_NAME })}
						</>
					)
				}
			/>
		</Modal>
	);
};

PremiumModal.propTypes = {
	isModalOpen: PropTypes.bool,
	setIsModalOpen: PropTypes.func,
	title: PropTypes.node,
	description: PropTypes.string,
};

export default PremiumModal;
