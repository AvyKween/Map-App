

export const getUserLocation = async(): Promise<[number, number]> => {

    return new Promise( (resolve, reject) => {

        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                // We set coords in this order because Mapbox first's parameter is longitude, and latitude, second
                resolve([ coords.longitude, coords.latitude ])
            },
            ( err ) => {
                alert('Failed to resolve geolocation');
                console.log(err);
                reject()
            },
            {
                enableHighAccuracy: true,
            }
        )
    });
}