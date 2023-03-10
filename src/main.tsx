import React from 'react';
import ReactDOM from 'react-dom/client';
import { MapsApp } from './MapsApp';

import maplibregl from 'maplibre-gl';
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
