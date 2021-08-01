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
            const url = "/businesses/" + currentUser.email
            const response = await fetch(url)
            const jsonData = await response.json()

            setBusinesses(jsonData)
            
        } catch (error) {
            console.error(error.message)
        }
    }


    const getMembers = async() => {
        try {
            

            const response = await fetch("/allMembers/" + currentBusiness)
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
                        <div className="modal" id="nameModal">
                            <div className="modal-dialog">
                                <div className="modal-content">

                                
                                <div className="modal-header">
                                    <h4 className="modal-title">Update Business Name</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>

                                
                                <div className="modal-body">
                                    <UpdateName name={business.name} />
                                </div>

                                
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
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
                        <div className="modal" id="websiteModal">
                            <div className="modal-dialog">
                                <div className="modal-content">

                                
                                <div className="modal-header">
                                    <h4 className="modal-title">Update Website</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>

                                
                                <div className="modal-body">
                                    <UpdateWebsite website={business.website} />
                                </div>

                                
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                </div>

                            </div>
                        </div>
                        </div>
                    </div>
                    <p>{business.address}, {business.city} {business.state}, {business.country}</p>
                    <div>
                        <p className="d-inline-flex">{business.description}</p>
                        <BiPencil data-toggle="modal" data-target="#descriptionModal" />
                        <div className="modal" id="descriptionModal">
                            <div className="modal-dialog">
                                <div className="modal-content">

                                
                                <div className="modal-header">
                                    <h4 className="modal-title">Update Description</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>

                                
                                <div className="modal-body">
                                    <UpdateDescription description={business.description} />
                                </div>

                                
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="members-list">
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#membersModal">
                            See All Members
                        </button>
                        <div className="modal" id="membersModal">
                            <div className="modal-dialog">
                                <div className="modal-content">

                                
                                <div className="modal-header">
                                    <h4 className="modal-title">{business.name} Members</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>

                                
                                <div className="modal-body">
                                    <BusinessMembers business={business.name} />
                                </div>

                                
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
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
