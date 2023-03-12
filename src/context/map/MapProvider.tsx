import { useReducer, useContext, useEffect } from 'react';
import { Map, Marker, Popup } from 'mapbox-gl';

import { MapContext } from './MapContext';
import { mapReducer } from './mapReducer';
import { PlacesContext } from '../';

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

  return (
    <MapContext.Provider value={{
      ...state,

      // Methods
      setMap
    }}>
      { children }
    </MapContext.Provider>
  )
}

