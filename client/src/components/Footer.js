import {React, useState, useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext'

const Footer = (props) => {

    const [businesses, setBusinesses] = useState([])
    const [businessExists, setBusinessExists] = useState(false)
    const {currentUser} = useAuth()

    const getBusinesses = async () => {
        try {
            const response = await fetch("http://localhost:5000/businesses/")
            const data = await response.json()

            setBusinesses(data)
            console.log(response)
            console.log(businesses)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getBusinesses()
    }, [])
    
    return (
        <>
            <div className="mt-5 text-center">
                {(businesses.length === 0) ? 
                <div>
                    <h3>List your business on Kyckstart:</h3>
                    <a href="/join">Join Kyckstart</a>
                </div>
                : null}
            </div>
        </>
    )
}

export default Footer
