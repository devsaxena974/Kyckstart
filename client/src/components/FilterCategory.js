import {React, useState, useEffect} from 'react'
import Business from './Business'
import { Link } from 'react-router-dom'

const FilterCategory = () => {

    const [type, setType] = useState("")
    const [businesses, setBusinesses] = useState([])

    async function getBusinesses() {
        try {
            const response = await fetch("/businesses")
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
                <div className="container mt-5 mb-5">
                    <div className="row">
                        <div className="col-sm">
                            <img className="h-10 w-50" src={business.image_path} />
                        </div>
                        <div className="col-sm">
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#" + business.business_id}>
                                {business.name}
                            </button>
                        </div>
                        <div className="col-sm">
                            {business.description}
                        </div>
                    </div>
                </div>
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
        <div>
            <div className="dropdown mt-2 mb-2">
                <label>Filter By Business Type</label>
                <select value={type} onChange={e => setType(e.target.value)}>
                    <option value=""></option>
                    <option value="Tech">Tech</option>
                    <option value="Retail">Retail</option>
                    <option value="Finance">Finance</option>
                    <option value="Pharmaceutical/Biotech">Pharmaceutical/Biotech</option>
                    <option value="Food">Food</option>
                    <option value="Grocery">Grocery</option>
                    <option value="Law">Law</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Barber">Barber</option>
                </select>
            </div>
            <p className="text-center">
            {businesses.filter((business) => {
                if (type === "") {
                    return null
                } else if (business.type.toLowerCase().includes(type.toLowerCase())) {
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
            <div className="container mt-5">
                <Link className="btn btn-success" to="/">Home</Link>
            </div>
        </div>
    )
}

export default FilterCategory
