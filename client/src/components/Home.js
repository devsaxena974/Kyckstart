import React, {Fragment, useEffect, useState} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

//components:
import Footer from './Footer'

const Home = (props) => {

    const [businesses, setBusinesses] = useState([])
    const {currentUser, logout} = useAuth()
    const [error, setError] = useState('')

    const getBusinesses = async() => {
        try {
            const response = await fetch("http://localhost:5000/businesses")
            const jsonData = await response.json()

            setBusinesses(jsonData)
        } catch (error) {
            console.error(error.message)
        }
    }

    async function handleLogout() {
        setError('')

        try {
            await logout()
            props.history.push("/login")
        } catch {
            setError('Failed to logout')
        }
    }

    useEffect(() => {
        getBusinesses()
    }, [])//the [] makes useEffect only make one request for every time the component is rendered

    return (
        <div className="justify-content-center position-absolute w-100 h-100 align-items-center align-content-center">
            <div className="mt-5 d-inline">
                <strong className="float-left">{currentUser.email}</strong>
                <Link className="btn btn-primary float-right mt-3" to="/mybusiness">My Business</Link>
            </div>
            <Link className="btn btn-primary float-right mt-3" to="/update-profile">Update Profile</Link>
            <button className="btn btn-primary float-right mt-3" onClick={handleLogout} >Log Out</button>
            <h1 className="text-center mt-5">Kyckstart</h1>
            <table class="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {businesses.map(business => (
                        <tr>
                            <td>{ business.name }</td>
                            <td>{ business.type }</td>
                            <td>{ business.rating }</td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
            <Footer />
        </div>
    )
}

export default Home
