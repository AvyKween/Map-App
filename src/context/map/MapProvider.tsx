import { useReducer, useContext, useEffect } from 'react';
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from 'mapbox-gl';

import { MapContext } from './MapContext';
import { mapReducer } from './mapReducer';
import { PlacesContext } from '../';
import { directionsApi } from '../../api';
import { DirectionsResponse } from '../../interfaces/directions';

interface Props {
  children: JSX.Element | JSX.Element[]
}

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
}
  
export const MapProvider = ({ children }: Props) => {

  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const { places } = useContext(PlacesContext)

  useEffect(() => {
    state.markers.forEach( marker => marker.remove() );
    const newMarkers: Marker[] = [];
    
    for (const place of places) {
      const [ lng, lat ] = place.center;
      const popup = new Popup()
        .setHTML(`
          <h4 class='text-lg'>${ place.text }</h4>
          <p>${ place.place_name }</p>
        `);

      const newMarker = new Marker()
        .setPopup( popup )
        .setLngLat([ lng, lat ])
        .addTo( state.map! );

      newMarkers.push( newMarker );
    }

    dispatch({ type: 'setMarkers', payload: newMarkers })
    
  }, [ places ])
  

  const setMap = ( map: Map ) => {

    const myLocPopup = new Popup()
      .setHTML(`
        <h4 class='text-lg'>Here i am</h4>
        <p>Somewhere in the world</p>
      `)

    new Marker({
      color: '#61DAFB',
      draggable: true
    })
      .setLngLat( map.getCenter() )
      .setPopup( myLocPopup )
      .addTo( map );
    
    // console.log( map.getCenter() );

    dispatch({
      type: 'setMap',
      payload: map
    })
  }

  const getRouteBetweenPoints = async( start: [ number, number ], end: [ number, number ] ) => {
    const resp = await directionsApi.get<DirectionsResponse>(`/${ start.join(',') };${ end.join(',') }`)
    const { distance, duration, geometry } = resp.data.routes[0];
    const { coordinates: coords } = geometry

    // console.log(resp)

    let kms = distance / 1000;
        kms = Math.round( kms * 100 );
        kms /= 100;

    const minutes = Math.floor( duration / 60 );

    const bounds = new LngLatBounds(
      start, 
      start
    );

    for (const coord of coords) {
      const newCoord: [ number, number ] = [ coord[0], coord[1] ];
      bounds.extend( newCoord );
    }

    state.map?.fitBounds( bounds, {
      padding: 200
    });

    // Polyline draw
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    }

    if ( state.map?.getLayer('RouteString') ) {
      state.map.removeLayer('RouteString');
      state.map.removeSource('RouteString');
    }

    state.map?.addSource( 'RouteString', sourceData );
    state.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': '#00D8FF',
        "line-width": 5
      }
    })

  }

  return (
    <MapContext.Provider value={{
      ...state,

      // Methods
      setMap,
      getRouteBetweenPoints
    }}>
      { children }
    </MapContext.Provider>
  )
}

