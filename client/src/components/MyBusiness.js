import {React, useState, useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

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

    function render() {
        if(businesses.length > 0) {
            return 
        }
    }

    return (
        <div className="container mt-5">
            {businesses.length === 0 && <h3>You have not enlisted a business with Kyckstart.</h3>}
            {businesses.map(business => (
                <div>
                    <h1>{business.name}</h1>
                    <h3>{business.type}</h3>
                    <p>{business.address}, {business.city} {business.state}, {business.country}</p>
                    <p>{business.description}</p>
                </div>
            ))}
            <Link className="btn btn-primary mt-3" to="/">Home</Link>
        </div>
    )
}

export default MyBusiness
