import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Stepper.scss';
import { TextTag } from '@vecindario/vecindario-suite-components';
import { history } from '../../../../../shared/application/helpers/history';

const Stepper = ({ stepElements, currentStep }) => {
	const redirectView = (path, index) => {
		if (currentStep > index || currentStep === index) history.push(path);
		return null;
	};

	const getChildClassName = (index) => {
		return classNames(
			{
				'-success': currentStep > index,
				'-current': currentStep >= index,
			},
			'step',
		);
	};

	return (
		<div className="container-stepper">
			{stepElements?.map((item, index) => (
				<div className={getChildClassName(index)} key={index} onClick={() => redirectView(item.path, index)}>
					<TextTag fw="bold" className="text-step">
						{item.step}
					</TextTag>
				</div>
			))}
		</div>
	);
};

Stepper.propTypes = {
	stepElements: PropTypes.array.isRequired,
	currentStep: PropTypes.number,
};

export default Stepper;
