import React, { useState } from 'react';
import { Accordion } from 'react-accessible-accordion';
import { integrations } from '../../../application/constants/integration';
import SearchBar from '../../../../../shared/presentation/components/searchBar';
import AccordionItem from './AccordionItem';
import './integration.scss';

const Integration = () => {
	const [filteredIntegrations, setFilteredIntegrations] = useState();

	const integrationsToShow = filteredIntegrations || integrations;

	return (
		<div className="container-integrations">
			<SearchBar
				placeHolder="Buscar integración"
				objsArray={integrations}
				callbackSearch={setFilteredIntegrations}
				className="search-bar margin-bottom-4"
			/>

			<Accordion allowZeroExpanded={true} preExpanded={[]} allowMultipleExpanded={true}>
				{integrationsToShow.map((integration) => (
					<AccordionItem key={integration.titleText} {...integration}>
						{integration.component}
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
};

export default Integration;
