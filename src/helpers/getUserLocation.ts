

export const getUserLocation = async(): Promise<[number, number]> => {

    return new Promise( (resolve, reject) => {

        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
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