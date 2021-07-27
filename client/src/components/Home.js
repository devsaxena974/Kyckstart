import React, {Fragment, useEffect, useState} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, Redirect } from 'react-router-dom'

//components:
import Footer from './Footer'
import Business from './Business'
import BecomeMember from './BecomeMember'
import Header from './Header'
import { Modal } from 'react-bootstrap'

const Home = (props) => {

    const [businesses, setBusinesses] = useState([])
    const [userType, setUserType] = useState([])
    const [revealMember, setRevealMember] = useState(false)
    const [memberships, setMemberships] = useState([])
    const [isShown, setIsShown] = useState(false)
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
    useEffect(() => {
        getBusinesses()
    }, [])//the [] makes useEffect only make one request for every time the component is rendered

    useEffect(() => {
        getUserType()
    }, [])


    return (
        <div className="justify-content-center position-absolute w-100 h-100 align-items-center align-content-center">
            
                
            {userType.map(userType => (
                <Header user_type={userType.user_type} />
            ))}
            
            
            {businesses.map(business => (
            
                <div key={business.business_id} className="card" style={{backgroundImage: `url(${business.image_path})`}}>
                    <div className="content">
                        <p>{ business.name }</p>
                        <p>{ business.type }</p>
                        <p>{ business.rating }</p>
                        <button type="button" className="btn btn-success" data-toggle="modal" data-target={"#" + business.business_id}>
                            Open
                        </button>
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
                                        member_perks={business.member_perks}
                                        website={business.website} />
                                    
                                    {userType.map(userType => (
                                        ((userType.user_type === 'member') ?
                                        <div id={business.business_id}>
                                            <BecomeMember name={business.name} />
                                        </div> :
                                        null )
                                    ))}
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
            {userType.map(userType => (
                <div>
                    <strong>{userType.user_type}</strong>
                </div>
            ))}
            {userType.map(userType => (
                    <div>
                        {((userType.user_type === 'business_owner') || (userType.user_type === 'basic_user')) ? <Footer />:
                        null}
                    </div>
                ))}
        </div>
    )
}

export default Home
