import { MapProvider, PlacesProvider } from './context';
import { Home } from './pages/Home';

export const MapsApp = () => {

  return (
    <PlacesProvider>
      <MapProvider>
        <Home />        
      </MapProvider>
    </PlacesProvider>
  )
}
