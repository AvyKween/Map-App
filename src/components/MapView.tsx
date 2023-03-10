import { useContext, useLayoutEffect, useRef } from "react"
import { Map } from 'maplibre-gl';

import { MapContext, PlacesContext } from "../context"
import { Loading } from './';

export const MapView = () => {

  const { isLoading, userLocation } = useContext(PlacesContext)
  const { setMap } = useContext(MapContext)

  const mapDiv = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if ( !isLoading ) {
      const map = new Map({
        container: mapDiv.current!,
        style: 'https://api.maptiler.com/maps/your_maptiler_settings', // stylesheet location
        center: userLocation, // starting position [lng, lat]
        zoom: 14 // starting zoom
        });

        setMap(map)
    }

  }, [ isLoading ])

  if (isLoading) {
    return ( <Loading /> )
  }

  return (
    <div 
      ref={ mapDiv }
      className="h-full w-full fixed top-0 left-0"
    >
        { userLocation?.join(' ') }
    </div>
  )
}
