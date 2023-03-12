import { useRef, useContext } from 'react';
import { PlacesContext } from '../context';
import { SearchResults } from './';

export const SearchBar = () => {

  const { searchPlacesByQuery } = useContext(PlacesContext)

  const debounceRef = useRef<NodeJS.Timeout>()

  const onQueryChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    if ( debounceRef.current ) {
      clearTimeout( debounceRef.current )
    }

    debounceRef.current = setTimeout(() => {
      searchPlacesByQuery( e.target.value )
    }, 350)
  }

  return (
    <div className="fixed top-4 left-4 z-10 w-72 p-1.5 bg-[#fefefe] border rounded shadow">
      <input 
        type="text" 
        placeholder="Search location"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        onChange={ onQueryChange }
      />

      <SearchResults />
    </div>
  )
}
