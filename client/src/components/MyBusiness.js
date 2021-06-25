import {React, useState, useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

import UpdateName from './UpdateName'
import UpdateType from './UpdateType'
import UpdateDescription from './UpdateDescription'

const MyBusiness = () => {
    const [businesses, setBusinesses] = useState([])
    const [showUpdateName, setShowUpdateName] = useState(false)
    const [showUpdateType, setShowUpdateType] = useState(false)
    const [showUpdateDescription, setShowUpdateDescription] = useState(false)
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
                        <button className="d-inline btn btn-warning ml-2" onClick={e => setShowUpdateName(true)}>Update Business Name</button>
                        {showUpdateName && <UpdateName name={businesses.name}/>}
                    </div>
                    <div>
                        <h3 className="d-inline">{business.type}</h3>
                        <button className="d-inline-block btn btn-warning ml-2" onClick={e => setShowUpdateType(true)}>Update Business Type</button>
                        {showUpdateType && <UpdateType name={businesses.type}/>}
                    </div>
                    <p>{business.address}, {business.city} {business.state}, {business.country}</p>
                    <div>
                        <p className="d-inline">{business.description}</p>
                        <button className="d-inline-block btn btn-warning ml-2" onClick={e => setShowUpdateDescription(true)}>Update Business Description</button>
                        {showUpdateDescription && <UpdateDescription name={businesses.type}/>}
                    </div>

                </div>
            ))}
            
            <Link className="btn btn-primary mt-3" to="/">Home</Link>
            <Link className="btn btn-warning mt-3 ml-2" to="/updatebusiness">Update</Link>
            
        </div>
    )
}

export default MyBusiness
