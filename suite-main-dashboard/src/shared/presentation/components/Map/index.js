import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';

import { isInitialLocation } from '../../../application/constants/project';
import { MAP_MARKER_ICON } from '../../../application/constants/images';
import { GOOGLE_MAP_API_KEY } from '../../../application/constants/env';
import { ZOOM } from '../../../application/constants/map';

import './Map.scss';
import mapStyles from './mapStyle';
import { MAP } from '../../../infrastructure/i18n/locales/translation_keys';
import { DOMAIN_NAME } from '../../../infrastructure/i18n/locales';

const options = {
	styles: mapStyles,
	disableDefaultUI: true,
	zoomControl: true,
};

const Map = ({ location }) => {
	const { t, i18n } = useTranslation();
	const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey: GOOGLE_MAP_API_KEY, language: i18n.language });
	const [marker, setMarker] = useState(null);
	const mapRef = useRef();

	const onMapLoad = useCallback((map) => {
		mapRef.current = map;
	}, []);

	const handleMarkersChange = (newLocation) => {
		!isInitialLocation(newLocation) && setMarker(newLocation);
	};

	const panTo = useCallback(({ lat, lng }) => {
		handleMarkersChange({ lat, lng });
	}, []);

	useEffect(() => {
		panTo(location || {});
	}, [location, panTo]);

	if (!isLoaded) return t(MAP.LOADING, { ns: DOMAIN_NAME });
	if (loadError) return t(MAP.ERROR, { ns: DOMAIN_NAME });

	return (
		<div className="map-ctn">
			<GoogleMap
				mapContainerStyle={{
					width: '100%',
					height: '100%',
					borderRadius: '8px',
				}}
				options={options}
				center={location}
				zoom={ZOOM}
				onLoad={onMapLoad}
			>
				{marker && (
					<Marker
						key={`marker`}
						position={marker}
						icon={{
							url: MAP_MARKER_ICON,
							scaledSize: new window.google.maps.Size(50, 60),
							origin: new window.google.maps.Point(0, 0),
							anchor: new window.google.maps.Point(15, 20),
						}}
					/>
				)}
			</GoogleMap>
		</div>
	);
};

Map.propTypes = {
	location: PropTypes.object,
};

export default Map;
