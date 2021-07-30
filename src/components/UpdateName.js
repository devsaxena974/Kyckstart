import {React, useState, useEffect, useRef} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

const UpdateName = (props) => {

    const [name, setName] = useState(props.name)
    const {currentUser} = useAuth()
    
    

    async function onSubmit(e) {
        e.preventDefault()
        try {
            const body = {name}

            const response = await fetch("https://kyckstart-server.herokuapp.com/businesses/editName/" + currentUser.email, {
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
                    <label>Name</label>
                    <input className="form-control w-100" type="text" value={name} onChange={e => setName(e.currentTarget.value)}/>
                </div>
                <button className="btn btn-success w-100 mt-3"onClick={onSubmit}>Update</button>
            </form>
        </div>
    )
}

export default UpdateName
