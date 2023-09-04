import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from '@vecindario/vecindario-suite-components';
import { ICON_SEARCH } from '../../../application/constants/icons';
import { filterData } from '../../../application/helpers/common-functions';
import './SearchBar.scss';

const SearchBar = ({ placeHolder, id, objsArray, callbackSearch, ...rest }) => {
	const [search, setSearch] = useState('');

	const handleSearchText = (e) => {
		const text = e.target.value;
		setSearch(text);
		callbackSearch(filterData(objsArray, text), text);
	};

	return (
		<div className="container-search">
			<Input
				id={id}
				placeholder={placeHolder}
				onChange={handleSearchText}
				icon={`${ICON_SEARCH} icon`}
				iconPosition="right"
				autoFocus
				{...rest}
				value={search}
				size="small"
			/>
		</div>
	);
};

SearchBar.propTypes = {
	placeHolder: PropTypes.string,
	id: PropTypes.string,
	objsArray: PropTypes.array,
	callbackSearch: PropTypes.func,
};

export default SearchBar;
