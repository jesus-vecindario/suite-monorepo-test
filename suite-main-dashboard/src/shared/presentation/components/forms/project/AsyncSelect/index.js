import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import AsyncReactSelect from 'react-select/async';
import { debounce } from 'lodash';
import { getSearchCities } from '../../../../../../domains/wizardProject/infrastructure/api/city';
import './AsyncSelect.scss';
import { ASYNC_SELECT } from '../../../../../infrastructure/i18n/locales/translation_keys';
import { DOMAIN_NAME } from '../../../../../infrastructure/i18n/locales';

function AsyncSelect({ label, onSelectItem, defaultOptionValue }) {
	const [selectedOption, setSelectedOption] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [isClearable, setIsClearable] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const { t } = useTranslation();

	const loadOptions = (text, callback) => {
		setIsLoading(true);
		getSearchCities(text)
			.then((response) => {
				const mappedData = response.map((city) => ({ value: city.id, label: city.search_text }));
				callback(mappedData);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const debouncedSearch = React.useRef(debounce(loadOptions, 300)).current;

	const emptyMessage = useMemo(() => {
		if (!inputValue) {
			return t(ASYNC_SELECT.EMPTY_MESSAGE, { ns: DOMAIN_NAME });
		}
		return t(ASYNC_SELECT.NOT_RESULT, { ns: DOMAIN_NAME });
	}, [inputValue, t]);

	const handleSelectItem = (item) => {
		setSelectedOption(item);
		setIsClearable(true);
		onSelectItem && onSelectItem(item);
	};

	const handleInputChange = (value) => {
		setInputValue(value);
	};

	return (
		<div className="suite-select-container suite-async-select-container">
			<div className="suite-select-label">
				<label className="suite-input-label">{label}</label>
			</div>
			<AsyncReactSelect
				loadOptions={debouncedSearch}
				value={selectedOption}
				onInputChange={handleInputChange}
				placeholder={t(ASYNC_SELECT.PLACEHOLDER, { ns: DOMAIN_NAME })}
				isLoading={isLoading}
				loadingMessage={() => t(ASYNC_SELECT.LOADING, { ns: DOMAIN_NAME })}
				noOptionsMessage={() => emptyMessage}
				onChange={handleSelectItem}
				defaultInputValue={defaultOptionValue?.value}
				isClearable={isClearable}
				classNames={{
					control: () => 'suite-async-select-control',
					indicatorSeparator: () => 'suite-async-select-indicator-separator',
				}}
			/>
		</div>
	);
}
AsyncSelect.propTypes = {
	onSelectItem: PropTypes.func,
	defaultOptionValue: PropTypes.string,
	label: PropTypes.string,
};

export default AsyncSelect;
