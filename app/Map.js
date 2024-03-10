import React, { useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';

const MapComponent = () => {
  useEffect(() => {
    // Initialize MapTiler SDK
    maptilersdk.config.apiKey = 'YOUR_MAPTILER_API_KEY_HERE';

    // Create map instance
    const map = new maptilersdk.Map({
      container: 'map', // container's id or the HTML element to render the map
      style: maptilersdk.MapStyle.STREETS,
      center: [16.62662018, 49.2125578], // starting position [lng, lat]
      zoom: 14 // starting zoom
    });

    // Create geocoding control
    const gc = new maptilersdkMaptilerGeocoder.GeocodingControl();

    // Add geocoding control to the map
    map.addControl(gc, 'top-left');

    // Cleanup function
    return () => {
      map.remove(); // Remove the map instance when component unmounts
    };
  }, []);

  return (
    <div id="map" style={{ width: '100%', height: '100vh' }}></div> // Render the map container
  );
};

export default MapComponent;
