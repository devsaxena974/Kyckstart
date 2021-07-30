import {React, useState, useEffect, useRef} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

const UpdateDescription = (props) => {

    const [description, setDescription] = useState(props.description)
    const {currentUser} = useAuth()
    
    

    async function onSubmit(e) {
        e.preventDefault()
        try {
            const body = {description}

            const response = await fetch("https://kyckstart-server.herokuapp.com/businesses/editDescription/" + currentUser.email, {
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
                    <label>Description</label>
                    <input className="form-control w-100" type="text" value={description} onChange={e => setDescription(e.currentTarget.value)}/>
                </div>
                <button className="btn btn-success w-100 mt-3"onClick={onSubmit}>Update</button>
            </form>
        </div>
    )
}

export default UpdateDescription
