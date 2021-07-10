import React from 'react'

const Business = ({ type, description, rating, phone, address, city, state, country, image_path }) => {
    return (
        <div className="mt-5 mb-5">
            <img style={{width:"100%"}} src={image_path} />
            <h3>{type}</h3>
            <p>{description}</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <p>{address}</p>
            <p>{city}, {state}</p>
            <p>{country}</p>
            <p>{phone}</p>
        </div>
    )
}

export default Business
