import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { getThisPage } from '../../modules/httpQueries';
import {apiKey} from '../../apiKey.json';

const GeneratedMarker = ({lat, lon}) => {
	const position = {lat: lat, lng: lon};

	return (
		<Marker
			position={position}
			clickable={false}	
		/>
	);
}

const containerStyle = {
	width: '400px',
	height: '400px'
};

const UserMap = () => {
	//const [map, setMap] = useState(null)
	const [userLocations, setUserLocations] = useState([]);
	const [mapCentre, setMapCentre] = useState({lat: 0, lng: 0});

	// const onLoad = React.useCallback(function callback(map) {
	// 	const bounds = new window.google.maps.LatLngBounds();
	// 	map.fitBounds(bounds);
	// 	setMap(map);
	// }, []);

	// const onUnmount = React.useCallback(function callback(map) {
	// 	setMap(null)
	// }, []);

	useEffect(() => {
		getThisPage('/map')
			.then(response => {
				if (response) {
					setMapCentre({lat: response.lat, lng: response.lon});
					setUserLocations(response.locations);
				}
			});
	}, []);

	const generatedMarkers = userLocations.map((location, index) => {
		return (
			<GeneratedMarker lat={location.latitude} lon={location.longitude} key={index} />
		)
	})

	if (!userLocations.length)
		return "Couldn't load user locations!";
	return (
		<LoadScript
			googleMapsApiKey={apiKey}
		>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={mapCentre} // This seems to have absolutely no effect
				zoom={6}
				//onLoad={onLoad}
				//onUnmount={onUnmount}
			>
				{generatedMarkers}
			</GoogleMap>
		</LoadScript>
	)
}

export default UserMap;
