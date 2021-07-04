import React from 'react'

const Business = ({ type, description, rating, phone, address, city, state, country, image_path, member_price, member_perks }) => {
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
            <h4>Membership Information</h4>
            <p>Rating: {rating}/5</p>
            <p>Member Perks: {member_perks}</p>
            <p>Membership Price: {member_price}</p>
        </div>
    )
}

export default Business
