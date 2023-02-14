import React, { useState, useEffect } from 'react';

function Geolocation(props) {
    const [country, setCountry] = useState(null);

    useEffect(() => {

        props.changeCountry(country)
    }, [country])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=2c8cb4121cf7442e8534188b5b142be6`)
                    .then(res => res.json())
                    .then(data => {
                        setCountry(data.results[0].components.country);
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

        console.log("Geolocation: " + country)
    }, []);

    return (
        <h2 className="user-info--text">{country}</h2>
    )
}

export default Geolocation;