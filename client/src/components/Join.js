import React, { Fragment, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

const Join = (props) => {

    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [description, setDesciption] = useState("")
    const [member_price, setMember_price] = useState("")
    const [member_perks, setMember_perks] = useState("")
    const {currentUser} = useAuth();
   

    const onSubmitForm = async (e) => {
        const email = currentUser.email
        e.preventDefault()
        try {
            const body = { name, type, phone, address, city, state, country, email, description, member_price, member_perks}
            
            const response = await fetch("http://localhost:5000/businesses", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
        } catch (error) {
            console.error(error.message)
        }
        props.history.push("/mybusiness")
    }

    return (
        <Fragment>
            <div className="d-flex justify-content-center position-absolute mt-5 w-100 h-100 align-items-center align-content-center">
                
                <form className="mt-5">
                    <h3>Add your business on Kyckstart</h3>
                    <h5>Business Name:</h5>
                    <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)}></input>
                    <h5>Business Type:</h5>
                    <input type="text" className="form-control" value={type} onChange={e => setType(e.target.value)}></input>
                    <h5>Description:</h5>
                    <input type="text" className="form-control" value={description} onChange={e => setDesciption(e.target.value)}></input>
                    <h5>Contact Phone (ex: 012-345-6789):</h5>
                    <input type="text" className="form-control" value={phone} onChange={e => setPhone(e.target.value)}></input>
                    <h5>Address:</h5>
                    <input type="text" className="form-control" value={address} onChange={e => setAddress(e.target.value)}></input>
                    <h5>City:</h5>
                    <input type="text" className="form-control" value={city} onChange={e => setCity(e.target.value)}></input>
                    <h5>State:</h5>
                    <input type="text" className="form-control" value={state} onChange={e => setState(e.target.value)}></input>
                    <h5>Country:</h5>
                    <input type="text" className="form-control" value={country} onChange={e => setCountry(e.target.value)}></input>
                    <h5>Member Price (ex: 7.99 or 19.00):</h5>
                    <input type="text" className="form-control" value={member_price} onChange={e => setMember_price(e.target.value)}></input>
                    <h5>Member Perks (Free monthly coupons for groceries):</h5>
                    <input type="text" className="form-control" value={member_perks} onChange={e => setMember_perks(e.target.value)}></input>
                    
                    <button className="btn btn-success mt-3" onClick={onSubmitForm}>Add</button>
                    <Link className="btn btn-danger mt-3 ml-2" to="/">Cancel</Link>
                </form>
                
            </div>
        </Fragment>
    )
}

export default Join
