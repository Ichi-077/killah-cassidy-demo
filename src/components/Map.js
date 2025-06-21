import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: 34.052235,
    lng: -118.243683
};

const Map = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "YOUR_API_KEY" // Replace with your API key
    })

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
        >
            { /* Child components, such as markers, info windows, etc. */}
        </GoogleMap>
    ) : <></>
}

export default React.memo(Map)