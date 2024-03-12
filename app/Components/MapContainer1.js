import React, { useEffect, useState } from 'react';
import { GeocodingControl } from "@maptiler/geocoding-control/maplibregl";
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import "maplibre-gl/dist/maplibre-gl.css";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import Autosuggest from 'react-autosuggest';

const MapComponent = () => {
  const [startPlace, setStartPlace] = useState('');
  const [endPlace, setEndPlace] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const coordinates = document.getElementById('coordinates');
    const my_location = "maptilersdk.GeolocationType.POINT"
    maptilersdk.config.apiKey = 'bEc9XJM4UHXmbGCx3PuY';
    
    const map = new maptilersdk.Map({
      container: 'map', 
      style: maptilersdk.MapStyle.STREETS,
      geolocate: my_location
    });

    const marker = new maptilersdk.Marker({
      draggable: true
    }).setLngLat({lng: 77.102493, lat: 28.704060}).addTo(map);
    
    function onDragEnd() {
      const lngLat = marker.getLngLat();
      coordinates.style.display = 'block';
      coordinates.innerHTML = 'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
    }
    marker.on('dragend', onDragEnd);
    
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

  const handleFindRoute = () => {console.log('Finding route between:', startPlace, 'and', endPlace);};

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : [
      { label: 'New York' },
      { label: 'Los Angeles' },
      { label: 'Chicago' },
      { label: 'Houston' },
      { label: 'Phoenix' },
    ].filter(suggestion => suggestion.label.toLowerCase().slice(0, inputLength) === inputValue);
  };

  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion.label}
    </div>
  );

  const onChangeStartPlace = (event, { newValue }) => {
    setStartPlace(newValue);
  };

  const onChangeEndPlace = (event, { newValue }) => {
    setEndPlace(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputPropsStart = {
    placeholder: 'Start Place',
    value: startPlace,
    onChange: onChangeStartPlace
  };

  const inputPropsEnd = {
    placeholder: 'End Place',
    value: endPlace,
    onChange: onChangeEndPlace
  };

  return (
    <div className='mapcontainer'> 
      <div id="map" style={{ width: '100%', height: '70vh' }}></div>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={(suggestion) => suggestion.label}
        renderSuggestion={renderSuggestion}
        inputProps={inputPropsStart}
      />
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={(suggestion) => suggestion.label}
        renderSuggestion={renderSuggestion}
        inputProps={inputPropsEnd}
      />
      <button onClick={handleFindRoute}>Find Route</button>
      <pre id='coordinates'></pre>
    </div>
  );
};

export default MapComponent;
