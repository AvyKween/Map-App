import { useContext } from 'react';
import { MapContext, PlacesContext } from '../context/';

export const BtnMyLocation = () => {

  const { map, isMapReady } = useContext(MapContext)
  const { userLocation } = useContext(PlacesContext)

  const handleClick = () => {
    if (!isMapReady) throw new Error('Map is not ready')
    if (!userLocation) throw new Error('User Location is not ready')
    
    map?.flyTo({
      zoom: 14,
      center: userLocation
    })
  }

  return (
    <button 
      onClick={ handleClick }
      className="fixed top-4 right-4 z-10 bg-[#00D8FF] hover:bg-sky-500 text-white font-bold py-2 px-4 rounded"
    >
      Go to my location
    </button>
  )
}
