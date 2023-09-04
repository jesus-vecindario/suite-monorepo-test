import React from 'react';
import PropTypes from 'prop-types';
import {
	AccordionItem as AccesibleAccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
} from 'react-accessible-accordion';
import IntegrationCard from '../IntegrationCard';
import './AccordionItem.scss';

const AccordionItem = ({ children, ...rest }) => {
	return (
		<AccesibleAccordionItem className="integrations-accordion-item">
			<AccordionItemHeading>
				<AccordionItemButton>
					<IntegrationCard {...rest} />
				</AccordionItemButton>
			</AccordionItemHeading>
			{children && <AccordionItemPanel>{children}</AccordionItemPanel>}
		</AccesibleAccordionItem>
	);
};

AccordionItem.propTypes = {
	children: PropTypes.node,
};

export default AccordionItem;
