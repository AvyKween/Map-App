import axios from 'axios';

const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
    params: {
        limit: 5,
        languaje: 'en',
        access_token: 'YOUR_API_KEY'
    }
})

export default searchApi;