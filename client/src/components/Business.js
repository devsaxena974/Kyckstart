import React from 'react'
import { Link } from 'react-router-dom'

const Business = ({ type, description, rating, phone, address, city, state, country, image_path, website }) => {
    return (
        <div className="business">
            <img style={{ position:"relative", top: "-40%", width:"100%"}} src={image_path} />
            <h3>{type}</h3>
            <p>{description}</p>
            <button onClick={e=> {window.open(`${website}`)}}>Website</button>
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
