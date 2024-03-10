 

import React, { useEffect } from 'react';
import { GeocodingControl } from "@maptiler/geocoding-control/maplibregl";
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import "maplibre-gl/dist/maplibre-gl.css";

const MapComponent = () => {
  useEffect(() => {
    maptilersdk.config.apiKey = 'bEc9XJM4UHXmbGCx3PuY';
    const map = new maptilersdk.Map({
      container: 'map', 
      style: maptilersdk.MapStyle.STREETS,
      center: [16.62662018, 49.2125578], 
      zoom: 14
    });
    const searchControl = new GeocodingControl({
      apiKey: 'bEc9XJM4UHXmbGCx3PuY',
      placeholder: 'Search for places...',
      language: 'en', 
      limit: 5, 
      autocomplete: true 
    });
    map.addControl(searchControl, 'top-left');

    searchControl.addEventListener('result', (result) => {
      const { place_name, center } = result.result;
      console.log(`Selected place: ${place_name}`, center);
    });
    return () => {
      map.remove(); 
    };
  }, []);

  return (
    <div> <div id="map" style={{ width: '100%', height: '80vh' }}></div>
    </div>
  );
};

export default MapComponent;
