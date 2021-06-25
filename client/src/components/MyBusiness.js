import {React, useState, useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

import UpdateName from './UpdateName'
import UpdateType from './UpdateType'
import UpdateDescription from './UpdateDescription'
import UpdatePrice from './UpdatePrice'
import UpdatePerks from './UpdatePerks'

const MyBusiness = () => {
    const [businesses, setBusinesses] = useState([])
    const {currentUser} = useAuth()

    const getBusiness = async() => {
        try {
            const url = "http://localhost:5000/businesses/" + currentUser.email
            const response = await fetch(url)
            const jsonData = await response.json()

            setBusinesses(jsonData)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getBusiness()
    }, [])

    return (
        <div className="container mt-5">
            {businesses.length === 0 && <h3>You have not enlisted a business with Kyckstart.</h3>}
            {businesses.map(business => (
                <div>
                    <div>
                        <h1 className="d-inline-flex">{business.name}</h1>
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#nameModal">
                            Update
                        </button>
                        <div class="modal" id="nameModal">
                            <div class="modal-dialog">
                                <div class="modal-content">

                                
                                <div class="modal-header">
                                    <h4 class="modal-title">Update Business Name</h4>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>

                                
                                <div class="modal-body">
                                    <UpdateName name={business.name} />
                                </div>

                                
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="d-inline-flex"><strong>Type: </strong> {business.type}</p>
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#typeModal">
                            Update
                        </button>
                        <div class="modal" id="typeModal">
                            <div class="modal-dialog">
                                <div class="modal-content">

                                
                                <div class="modal-header">
                                    <h4 class="modal-title">Update Business Type</h4>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>

                                
                                <div class="modal-body">
                                    <UpdateType type={business.type} />
                                </div>

                                
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <p>{business.address}, {business.city} {business.state}, {business.country}</p>
                    <div>
                        <p className="d-inline-flex">{business.description}</p>
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#descriptionModal">
                            Update
                        </button>
                        <div class="modal" id="descriptionModal">
                            <div class="modal-dialog">
                                <div class="modal-content">

                                
                                <div class="modal-header">
                                    <h4 class="modal-title">Update Description</h4>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>

                                
                                <div class="modal-body">
                                    <UpdateDescription description={business.description} />
                                </div>

                                
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="d-inline-flex"><strong>Membership Price:</strong> ${business.member_price}</p>
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#priceModal">
                            Update
                        </button>
                        <div class="modal" id="priceModal">
                            <div class="modal-dialog">
                                <div class="modal-content">

                                
                                <div class="modal-header">
                                    <h4 class="modal-title">Update Membership Price</h4>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>

                                
                                <div class="modal-body">
                                    <UpdatePrice price={business.member_price} />
                                </div>

                                
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="d-inline-flex"><strong>Membership Perks:</strong> {business.member_perks}</p>
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#perksModal">
                            Update
                        </button>
                        <div class="modal" id="perksModal">
                            <div class="modal-dialog">
                                <div class="modal-content">

                                
                                <div class="modal-header">
                                    <h4 class="modal-title">Update Membership Perks</h4>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>

                                
                                <div class="modal-body">
                                    <UpdatePerks perks={business.member_perks} />
                                </div>

                                
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            ))}
            
            <Link className="btn btn-primary mt-3" to="/">Home</Link>
        </div>
    )
}

export default MyBusiness
