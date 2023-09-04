import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Popover } from 'react-tiny-popover';
import { useSelector } from 'react-redux';

const customStyles = { zIndex: '110' };

const Dropdown = ({ content, children, isRestDay, positions = ['bottom', 'top'], padding = 5 }) => {
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const changeShowPopover = () => setIsPopoverOpen(!isPopoverOpen);
	const { closePopoverDashboard } = useSelector((state) => state.dashboard);

	useEffect(() => {
		if (closePopoverDashboard && isPopoverOpen) {
			setIsPopoverOpen(false);
		}
	}, [closePopoverDashboard, isPopoverOpen]);
	return (
		<Popover
			isOpen={isPopoverOpen}
			positions={positions}
			padding={padding}
			onClickOutside={() => setIsPopoverOpen(false)}
			content={() => (isRestDay ? <></> : <>{React.cloneElement(content, { changeShowPopover })}</>)}
			containerStyle={customStyles}
		>
			<div onClick={changeShowPopover}>{children}</div>
		</Popover>
	);
};

Dropdown.propTypes = {
	content: PropTypes.node,
	children: PropTypes.node,
	positions: PropTypes.array,
	padding: PropTypes.number,
	isRestDay: PropTypes.bool,
};

export default Dropdown;
