# Map App
Search routes between your location and other places using Mapbox directions api

## Getting started
Before starting we need a Mapbox api key which you can get at their official website [here](https://www.mapbox.com/).

Then we need to replace the accessToken at `/src/main.tsx` and at our axios api instances at `/src/api/directionsApi.ts` && `src/api/searchApi.ts`. \
For that, we just need to change the keyword `YOUR_API_KEY` for the one provided by mapbox.

Install the required dependencies with:
```
yarn
```

## Running the app: 

For running in development environment we use:
```
yarn dev
```
Once dev server is ready, go to [http://localhost:5173](http://localhost:5173)

Building for production:
```
yarn build
```

Preview of the build with:
```
yarn preview
```
To see the preview of our build production go to [http://localhost:4173](http://localhost:4173)

Note: This was made just for testing mapbox api, do not deploy this app since we are keeping secret keys in the client side and even if you are using gitignore and an .env file, is not secure. React environment variables are embedded in the build and are publicly accessible.