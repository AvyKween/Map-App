import { useContext, useState } from "react"
import { MapContext, PlacesContext } from "../context"
import { Feature } from "../interfaces/places"
import { LoadingPlaces } from "./"

export const SearchResults = () => {

  const { places, isLoadingPlaces } = useContext(PlacesContext)
  const { map } = useContext(MapContext)

  const [activeId, setActiveId] = useState('')

  const handlePlaceClick = ( place: Feature ) => {
    setActiveId( place.id )
    const [ lng, lat ] = place.center;
    map?.flyTo({
      zoom: 14,
      center: [ lng, lat ]
    })
  }

  if ( isLoadingPlaces ) {
    return <LoadingPlaces />
  }

  if ( places.length === 0 ) {
    return <></>
  }

  return (
    <ul className="z-10">

      {
        places.map( place => (
          <li 
            key={ place.id } 
            onClick={ () => handlePlaceClick( place ) }
            className={ `${ activeId === place.id ? 'bg-[#00D8FF] text-white' : 'bg-[rgba(255,255,255,1)] hover:bg-[#f9f9f9] text-gray-700' } mt-1 shadow appearance-none border rounded w-full py-2 px-3 leading-tight cursor-pointer` }
          >
            <h6 className="font-medium">{ place.text }</h6>
            <p className="text-xs mt-1">{ place.place_name }</p>
            <button className={ `${ activeId === place.id ? 'text-white border-white hover:bg-[#00aeff]' : 'border-[#00D8FF] hover:bg-[#00D8FF] hover:text-white'} mt-2 z-10 border text-[#00D8FF] font-bold py-2 px-4 rounded text-xs` }>
              Directions
            </button>
          </li>
        ))
      }

    </ul>
  )
}
