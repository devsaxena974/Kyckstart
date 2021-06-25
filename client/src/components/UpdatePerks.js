import {React, useState, useEffect, useRef} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

const UpdatePerks = (props) => {

    const [perks, setPerks] = useState(props.perks)
    const {currentUser} = useAuth()
    
    

    async function onSubmit(e) {
        e.preventDefault()
        try {
            const body = {perks}

            const response = await fetch("http://localhost:5000/businesses/editPerks/" + currentUser.email, {
                method: "PUT",
                headers: { 'Content-Type': "application/json"},
                body: JSON.stringify(body)
            })
            window.location.reload()
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div>
            <form>
                <div>
                    <label>Membership Perks</label>
                    <input className="form-control w-100" type="text" value={perks} onChange={e => setPerks(e.currentTarget.value)}/>
                </div>
                <button className="btn btn-success w-100 mt-3"onClick={onSubmit}>Update</button>
            </form>
            {/* THis is where modal starts */}
            
        </div>
        
    )
}

export default UpdatePerks