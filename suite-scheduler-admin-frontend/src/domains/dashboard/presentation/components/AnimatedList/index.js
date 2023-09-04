import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

const AnimatedList = memo(
	({ transitionGroupProps, ChildComponent, listToMap = [], animationProps: { classNames, timeout, ...moreProps } }) => {
		return (
			<TransitionGroup {...transitionGroupProps}>
				{listToMap.map(({ key, ...rest }, indexAsKey) => (
					<CSSTransition key={key || indexAsKey} classNames={classNames} timeout={timeout} {...moreProps}>
						<ChildComponent {...rest} />
					</CSSTransition>
				))}
			</TransitionGroup>
		);
	},
);

AnimatedList.propTypes = {
	transitionGroupProps: PropTypes.object,
	ChildComponent: PropTypes.elementType.isRequired,
	listToMap: PropTypes.array.isRequired,
	animationProps: PropTypes.shape({
		classNames: PropTypes.string.isRequired,
		timeout: PropTypes.number.isRequired,
	}).isRequired,
};

export default AnimatedList;
