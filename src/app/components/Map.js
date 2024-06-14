"use client";

import { useState, useCallback, memo, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const Map = ({ locations }) => {
    const containerStyle = {
        width: '209%',  // Adjusted width to 200%
        height: '80vh',
    };

    const [center, setCenter] = useState(null);
    const [zoom, setZoom] = useState(7);
    const [map, setMap] = useState(null);

    const image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API,
    });

    useEffect(() => {
        if (locations.length > 0 && isLoaded && map) {
            const bounds = new window.google.maps.LatLngBounds();
            locations.forEach(location => {
                const lat = parseFloat(location.latitude);
                const lng = parseFloat(location.longitude);

                if (!isNaN(lat) && !isNaN(lng)) {
                    bounds.extend({ lat, lng });
                } else {
                    console.warn('Invalid latitude or longitude in location:', location);
                }
            });
            map.fitBounds(bounds);
            // Optional: Adjust zoom if needed after fitting bounds
             const zoomLevel = map.getZoom();
             if (zoomLevel > 10) {
               map.setZoom(10);
             }
        } else if (isLoaded && map) {
            // Set default zoom when there are no markers
            map.setZoom(0);
        }
    }, [locations, isLoaded, map]);

    const onLoad = useCallback((map) => setMap(map), []);
    const onUnmount = useCallback(() => setMap(null), []);

    console.log(locations)

    if (!isLoaded) {
        return <div>Loading map...</div>;
    }

    if (loadError) {
        return <div>Error loading map: {loadError.message}</div>;
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {locations.map((location, index) => (
                <Marker
                    key={index}
                    position={{
                        lat: parseFloat(location.latitude),
                        lng: parseFloat(location.longitude),
                    }}
                    icon={{
                        url: image,
                        anchor: new window.google.maps.Point(5, 58),
                    }}
                />
            ))}
        </GoogleMap>
    );
};

export default memo(Map);
