import { useContext, useLayoutEffect, useRef } from "react"
import { Map } from  'mapbox-gl';

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
        style: 'mapbox://styles/mapbox/streets-v12', 
        center: userLocation,
        zoom: 14
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
    ></div>
  )
}
