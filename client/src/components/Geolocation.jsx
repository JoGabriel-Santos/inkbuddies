import React, { useEffect, useState } from "react";

function Geolocation(props) {
    const [country, setCountry] = useState(null);
    const [latLong, setLatLong] = useState(null);

    useEffect(() => {

        props.changeCountry(country, latLong);
    }, [country]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=2c8cb4121cf7442e8534188b5b142be6`)
                    .then(response => response.json())
                    .then(data => {
                        setCountry(data.results[0].components.country);
                        setLatLong(data.results[0].geometry);
                    })
                    .catch(err => console.error(err));
            },
            (error) => console.error(error),
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 5000,
            }
        );

    }, []);

    return (
        <h2 className="user-info--text">{country}</h2>
    )
}

export default Geolocation;