import React, {Fragment, useEffect, useState} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, Redirect } from 'react-router-dom'

//components:
import Footer from './Footer'
import Business from './Business'

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
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Rating</th>
                        <th>More</th>
                    </tr>
                </thead>
                <tbody>
                    {businesses.map(business => (
                        <tr key={business.business_id}>
                            <td>{ business.name }</td>
                            <td>{ business.type }</td>
                            <td>{ business.rating }</td>
                            <td>
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target={"#" + business.business_id}>
                                    Open
                                </button>
                                <div class="modal" id={business.business_id}>
                                    <div class="modal-dialog">
                                        <div class="modal-content">

                                        
                                        <div class="modal-header">
                                            <h4 class="modal-title">{business.name}</h4>
                                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                                        </div>

                                        
                                        <div class="modal-body">
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

                                        
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                        </div>

                                    </div>
                                </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
            <Footer />
        </div>
    )
}

export default Home
