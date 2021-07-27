import {React, useState} from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Header = (props) => {

    const {currentUser, logout} = useAuth()
    const [error, setError] = useState("")

    async function handleLogout() {
        setError('')

        try {
            await logout()
            props.history.push("/login")
        } catch {
            setError('Failed to logout')
        }
    }

    return (
        <div className="mt-2 d-inline">
            <div className="float-left mt-2 mb-5">
                <Link className="btn btn-primary ml-2" to="/browse">Browse</Link>
            </div>
            <div>
                {(props.user_type === 'business_owner') ? <Link className="btn btn-primary float-right mt-3 ml-2 mr-2" to="/mybusiness">My Business</Link>:
                null}
                {(props.user_type === 'member') ? <Link className="btn btn-primary float-right mt-3 ml-2 mr-2" to="/memberships">Memberships</Link>:
                null}
            </div>
            <Link className="btn btn-primary float-right mt-3 ml-2" to="/update-profile">Update Profile</Link>
            <button className="btn btn-primary float-right mt-3 ml-2" onClick={handleLogout} >Log Out</button>
            <h1 className="text-center mt-5">Kyckstart</h1>
        </div>
    )
}

export default Header
