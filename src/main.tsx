import React from 'react';
import ReactDOM from 'react-dom/client';
import { MapsApp } from './MapsApp';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');" 
mapboxgl.accessToken = 'YOUR_API_KEY';

import './index.css';

if ( !navigator.geolocation ) {
  alert('Your browser does not support Geolocation');
  throw new Error('Your browser does not support Geolocation');
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>,
)
