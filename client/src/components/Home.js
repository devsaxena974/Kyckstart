import React, {Fragment, useEffect, useState} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, Redirect } from 'react-router-dom'

//components:
import Footer from './Footer'
import Business from './Business'
import BecomeMember from './BecomeMember'

const Home = (props) => {

    const [businesses, setBusinesses] = useState([])
    const [userType, setUserType] = useState([])
    const [revealMember, setRevealMember] = useState(false)
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

    const getUserType = async () => {
        try {
            const response = await fetch("http://localhost:5000/users/"+currentUser.email)
            const data = await response.json()

            setUserType(data)
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

    function refreshPage() {
        window.location.reload(false)
    }

    useEffect(() => {
        getBusinesses()
    }, [])//the [] makes useEffect only make one request for every time the component is rendered

    useEffect(() => {
        getUserType()
    }, [])

    return (
        <div className="justify-content-center position-absolute w-100 h-100 align-items-center align-content-center">
            <div className="mt-5 d-inline">
                <strong className="float-left">{currentUser.email}</strong>
                {userType.map(userType => (
                    <div>
                        {(userType.user_type === 'business_owner') ? <Link className="btn btn-primary float-right mt-3" to="/mybusiness">My Business</Link>:
                        null}
                    </div>
                ))}
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
                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#" + business.business_id}>
                                    Open
                                </button>
                                <div className="modal" id={business.business_id}>
                                    <div className="modal-dialog">
                                        <div className="modal-content">

                                        
                                        <div className="modal-header">
                                            <h4 className="modal-title">{business.name}</h4>
                                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                                        </div>

                                        
                                        <div className="modal-body">
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
                                            
                                            <button className="btn btn-primary" onClick={e => setRevealMember(true)}>Join {business.name}</button>
                                            {userType.map(userType => (
                                                revealMember && <BecomeMember name={business.name} user_type={userType.user_type} />))}
                                        </div>

                                        
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                        </div>

                                    </div>
                                </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
            {userType.map(userType => (
                <div>
                    <strong>{userType.user_type}</strong>
                </div>
            ))}
            {userType.map(userType => (
                    <div>
                        {(userType.user_type === 'basic_user') ? <Footer />:
                        null}
                    </div>
                ))}
        </div>
    )
}

export default Home
