import {React, useState, useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import {BiPencil} from "react-icons/bi"

import UpdateName from './UpdateName'
import UpdateType from './UpdateType'
import UpdateDescription from './UpdateDescription'
import BusinessMembers from './BusinessMembers'
import UpdateWebsite from './UpdateWebsite'


const MyBusiness = () => {
    const [businesses, setBusinesses] = useState([])
    const [currentBusiness, setCurrentBusiness] = useState([])
    const [members, setMembers] = useState([])
    const {currentUser} = useAuth()

    const getBusiness = async() => {
        try {
            const url = "https://kyckstart-server.herokuapp.com/businesses/" + currentUser.email
            const response = await fetch(url)
            const jsonData = await response.json()

            setBusinesses(jsonData)
            
        } catch (error) {
            console.error(error.message)
        }
    }


    const getMembers = async() => {
        try {
            

            const response = await fetch("https://kyckstart-server.herokuapp.com/allMembers/" + currentBusiness)
            const jsonData = await response.json()

            setMembers(jsonData)
        } catch (error) {
            console.log(error.message)
        }
    }


    useEffect(() => {
        getBusiness()
    }, [])

    useEffect(() => {
        getMembers()
    }, [])

    

    return (
        <div className="container mt-5">
            {businesses.length === 0 && <h3>You have not enlisted a business with Kyckstart.</h3>}
            {businesses.map(business => (
                <div>
                    <div>
                        <img style={{width:"100%"}} src={business.image_path} />
                        <h1 className="d-inline-flex">{business.name}</h1>
                        <BiPencil data-toggle="modal" data-target="#nameModal"></BiPencil>
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
                        <p className="d-inline-flex"><strong>Type:</strong>  {business.type}</p>
                    </div>
                    <div>
                        <a onClick={e => {window.open(`${business.website}`)}}>Website</a>
                        <BiPencil data-toggle="modal" data-target="#websiteModal" />
                        <div class="modal" id="websiteModal">
                            <div class="modal-dialog">
                                <div class="modal-content">

                                
                                <div class="modal-header">
                                    <h4 class="modal-title">Update Website</h4>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>

                                
                                <div class="modal-body">
                                    <UpdateWebsite website={business.website} />
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
                        <BiPencil data-toggle="modal" data-target="#descriptionModal" />
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
                    <div id="members-list">
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#membersModal">
                            See All Members
                        </button>
                        <div class="modal" id="membersModal">
                            <div class="modal-dialog">
                                <div class="modal-content">

                                
                                <div class="modal-header">
                                    <h4 class="modal-title">{business.name} Members</h4>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>

                                
                                <div class="modal-body">
                                    <BusinessMembers business={business.name} />
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
