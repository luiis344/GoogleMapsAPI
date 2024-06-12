"use client"

import {useState, useCallback, memo} from "react";
import {GoogleMap, UseJsApiLoader, Maker, useJsApiLoader, Marker} from '@react-google-maps/api'
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const Map = ({ locations }) => {
    const containerStyle = {
        width: "255%",
        height: "180%"
    }

    const center ={
        lat: locations[0]?.latitude,
        lng: locations[0]?.longitude

    }

    const image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"

    const {isLoaded} = useJsApiLoader(
        {
            id: 'google-map-script',
            googleMapsApiKey:process.env.NEXT_PUBLIC_MAP_API,
        })

    const [map, setMap] = useState(null)

const onLoad = useCallback(map => {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)
    setMap(map)
},[])

    const onUmount = useCallback(map => {
        setMap(null)
    })


    return (
        isLoaded ? (
            <GoogleMap
            mapContainerStyle={containerStyle}
                center={center}
                zoom={5}
                onLoad={onLoad}
                onUmount={onUmount}
            >
                {locations.map((location, _index) => (
                    <Marker
                        key={_index}
                        position={{
                            lat: location.latitude,
                            lng: location.longitude
                        }}
                        icon={{
                            url: image,
                            anchor: new window.google.maps.Point(5, 58),
                        }}
                    />
                ))}

            </GoogleMap>

        ) :  <></>
    )
}
export default memo(Map)