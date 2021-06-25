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

            const response = await fetch("http://localhost:5000/businesses/editDescription/" + currentUser.email, {
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
                <h2 className="text-center mb-5 mt-5">Update</h2>
                <div>
                    <label>Name</label>
                    <input className="form-control w-100" type="text" value={description} onChange={e => setDescription(e.currentTarget.value)}/>
                </div>
                <button className="btn btn-success w-100 mt-3"onClick={onSubmit}>Update</button>
            </form>
            <div className="w-100 text-center mt-2">
                <a href="/mybusiness">Cancel</a>
            </div>
        </div>
    )
}

export default UpdateDescription
