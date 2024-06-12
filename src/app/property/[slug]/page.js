import ImageCard from "@/app/components/ImageCard";
import Link from "next/link";

const getProperty = async (slug) => {
    const HYGRAPH_ENDPOINT = process.env.HYGRAPH_ENDPOINT

    if (!HYGRAPH_ENDPOINT) {
        throw new Error(" HYGRAPH_ENDPOINT is not set")
    }
    const response = await fetch(HYGRAPH_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `query Property($slug: String) {
                 property( where: { slug: $slug}) {
                        id,
                       name,
                       description,
                       rentalPrice,
                       parking,
                       pool,
                       petFriendly,
                       inUnitDryer,
                       elevator,
                       beds,
                       images{
                          id,
                          url,
                          fileName
                       }
                        managingBoker{
                          name,
                         phoneNumber
                       }                                 
                 }
            }`,
            variables:{
                slug: slug
             },
        }),
    })
    const data = await response.json()
    return data.data.property

}

const Property = async ({ params }) => {
    const property = await getProperty(params.slug)
    console.log(property.images)

    return (
        <div className="property">
            <div className="property-images-container">
                {property.images.map(image => (
                    <ImageCard
                        key={image.id}
                        url={image.url}
                        fileName={image.fileName}
                        width={2000}
                        height={550}
                    />
                ))}

            </div>
            <div className="property-info-container">
                <h1>{property.name}</h1>
                <h2><span>{property.beds} Beds</span><span>${property.rentalPrice}</span></h2>
                <br/>
                <h2>Overview</h2>
                <p>{property.description}</p>
                <br/>
                <h2>Amenities:</h2>
                <ul>
                    {property.parking && <li>Private Parking</li>}
                    {property.pool && <li>Pool</li>}
                    {property.petFriendly && <li>Pet Friendly</li>}
                    {property.inUnitDryer && <li>In-Unit Dryer</li>}
                    {property.elevator && <li>Elevator</li>}
                </ul>
                <br/>
                <h3>Licenced Brokerage</h3>
                <p>Managing Broker: {property.managingBoker.name}</p>
                <p>Phone Number: {property.managingBoker.phoneNumber}</p>
                <br/>
                <Link href={"/"}>
                    <button>Go back</button>
                </Link>
            </div>
        </div>
    )
}

export default Property;
