import {React, useState, useEffect, Fragment} from 'react'
import { Link } from 'react-router-dom'

import Business from './Business'

const SearchBar = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const [businesses, setBusinesses] = useState([])

    async function getBusinesses() {
        try {
            const response = await fetch("http://localhost:5000/businesses")
            const data = await response.json()

            setBusinesses(data)
            console.log(businesses)
        } catch (error) {
            console.log(error.message)
        }
    }

    function modal(business) {
        return (
            <div>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#" + business.business_id}>
                    {business.name}
                </button>
                <div className="modal" id={business.business_id}>
                    <div className="modal-dialog">
                        <div className="modal-content">

                        
                        <div className="modal-header">
                            <h4 className="modal-title">{business.name}</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        
                        <div className="modal-body" id={business.business_id}>
                            <Business 
                                name={business.name} 
                                type={business.type}
                                description={business.description}
                                rating={business.rating}
                                phone={business.phone}
                                image_path={business.image_path}
                                address={business.address}
                                city={business.city}
                                state={business.state}
                                country={business.country}
                                member_price={business.member_price}
                                member_perks={business.member_perks} />
                            
                            {/* {userType.map(userType => (
                                ((userType.user_type === 'member') ?
                                <div id={business.business_id}>
                                    <BecomeMember name={business.name} />
                                </div> :
                                null )
                            ))} */}
                        </div>

                        
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
                </div>
            </div>
        )
    }

    useEffect(() => {
        getBusinesses()
    }, [])

    return (
        <div className="justify-content-center position-absolute w-100 h-100 align-items-center align-content-center container">
            <input className="form-control w-100 mt-5 mb-5"type="text" placeholder="Search..." onChange={e => setSearchTerm(e.target.value)}/>
            <p className="text-center">
            {businesses.filter((business) => {
                if (searchTerm == "") {
                    return business
                } else if (business.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return business
                }
            }).map((business, key) => {
                return (
                    <div key={key}>
                        {modal(business)}
                    </div>
                )
            })}
            </p>
            <button className="btn btn-primary mt-5 mb-5" onClick={e => window.location.reload()}>Back</button>
            <Link className="btn btn-success mt-5 mb-5 ml-2" to="/">Home</Link>
        </div>
    )
}

export default SearchBar
