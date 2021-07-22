import {React, useState, useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

const Memberships = () => {

    const [memberships, setMemberships] = useState([])
    const {currentUser} = useAuth()

    async function getMemberships() {
        const url = "http://localhost:5000/members/" + currentUser.email
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
            const response = await fetch(`http://localhost:5000/deleteMembership/${currentUser.email}/${business}`, {
                method: "DELETE"
            })

            setMemberships(memberships.filter(membership=> membership.business !== business))

            const response2 = await fetch(`http://localhost:5000/businesses/removeMembersByName/${business}`, {
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
                <div className="d-inline-flex">
                    <h4 className="float-left">{membership.business}</h4>
                    <button className="btn btn-danger float-right" onClick={() => deleteMembership(membership.business)}>Cancel Membership</button>
                </div>
            ))}
            <div className="container mt-5">
                <Link className="btn btn-primary" to="/">Home</Link>
            </div>
        </div>
    )
}

export default Memberships
