import {React, useState, useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

const Memberships = () => {

    const [memberships, setMemberships] = useState([])
    const {currentUser} = useAuth()

    async function getMemberships() {
        const url = "https://kyckstart-server.herokuapp.com/members/" + currentUser.email
        try {
            const response = await fetch(url)
            const data = await response.json()

            setMemberships(data)
            console.log(data)
        } catch (error) {
            console.log(error.message)
        }
    }

    async function deleteMembership(business) {
        try {
            const response = await fetch(`https://kyckstart-server.herokuapp.com/deleteMembership/${currentUser.email}/${business}`, {
                method: "DELETE"
            })

            setMemberships(memberships.filter(membership=> membership.business !== business))

            const response2 = await fetch(`https://kyckstart-server.herokuapp.com/businesses/removeMembersByName/${business}`, {
                method:"PUT",
                headers: {'Content-Type': "application/json"}
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getMemberships()
    }, [])

    return (
        <div className="container mt-5">
            <h1>Current Memberships</h1>
            {memberships.map(membership => (
                <div className="mt-5">
                    <h4 className="">{membership.business}</h4>
                    <button className="btn btn-danger" onClick={() => deleteMembership(membership.business)}>Cancel Membership</button>
                </div>
            ))}
            <div className="container mt-5">
                <Link className="btn btn-primary" to="/">Home</Link>
            </div>
        </div>
    )
}

export default Memberships
