import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextTag } from '@vecindario/vecindario-suite-components';
import { CLOSE_ACCORDION_ICON } from '../../../../../tools/application/constants/icons';
import './IntegrationCard.scss';

const IntegrationCard = ({ imageUrl, descriptionText, titleText, buttonText, icon, component, buttonAction }) => {
	const [showComponent, setShowComponent] = useState(false);

	const setButtonText = useCallback(() => {
		if (showComponent) {
			return (
				<>
					<i className={`${CLOSE_ACCORDION_ICON} icon`} /> Cerrar
				</>
			);
		}
		return buttonText;
	}, [buttonText, showComponent]);

	return (
		<div className="integration-card">
			<div className="card-wrapper">
				<div className="image-container">
					{imageUrl && <img src={imageUrl} className="logo" alt="" />}
					{icon}
				</div>
				<div className="txt-ctn">
					<TextTag tag="h3" fw="normal" variant="-body" className="title">
						{titleText}
					</TextTag>
					<TextTag tag="p" fw="normal" variant="-body-sm" className="description">
						{descriptionText}
					</TextTag>
				</div>
				<div className="btn-wrapper">
					<Button variant="default" onClick={() => setShowComponent(!showComponent)} className="active-accordion-btn">
						{setButtonText()}
					</Button>
					{buttonAction}
				</div>
			</div>
			{showComponent && <div className="card-accordion-wrapper">{component}</div>}
		</div>
	);
};

IntegrationCard.propTypes = {
	imageUrl: PropTypes.string,
	descriptionText: PropTypes.node,
	titleText: PropTypes.string,
	buttonText: PropTypes.string,
	icon: PropTypes.node,
	component: PropTypes.node,
	buttonAction: PropTypes.node,
};

IntegrationCard.defaultProps = {
	buttonText: 'Obtener',
	buttonVariant: '-secondary',
};

export default IntegrationCard;
