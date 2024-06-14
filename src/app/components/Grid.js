"use client"
import {useState, useEffect} from 'react'
import Card from '@/app/components/Card'
import Map from '@/app/components/Map'

const Grid = ({properties}) => {
    const [input, setInput] = useState('')
    const [houses, setHouses] = useState(properties)
    const [locations, setLocations] = useState(houses.map(house => house.location))

    useEffect(() => {
        // Atualiza locations somente quando houses muda
        setLocations(houses.map(house => house.location));
    }, [houses]);

    const setInputAndMapLocations = (value) => {
        setInput(value);
        setHouses(properties.filter(property =>
            property.name.toLowerCase().includes(value.toLowerCase())
        ));
    };

    return (
        <>
            <div className="search-bar">
                <input

                    placeholder="Search locations"
                    onChange={(e) => setInputAndMapLocations(e.target.value)}
                    value={input}
                />
            </div>
            <main>
                <article>
                    <Map locations={locations}/>
                </article>
                <article className="listings"></article>
                <h2>Rental Listings</h2>
                <div className="card-container">
                    {houses.map(property => <Card
                        key={property.id}
                        propertyName={property.name}
                        slug={property.slug}
                        rentalPrice={property.rentalPrice}
                        beds={property.beds}
                        image={property.images[0]}
                    />)}
                </div>
            </main>
        </>
    )
 }

 export default Grid