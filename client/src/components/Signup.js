import React, {Component, Fragment, useRef, useState} from 'react'
import { useAuth } from '../contexts/AuthContext';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';



const Signup = (props) => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordConfirmRef = useRef(null);
    const {signup} = useAuth()
    const[error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [formselect, setFormselect] = useState('basic_user')

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            let email = emailRef.current.value
            let user_type = formselect
            const body = {email, user_type}

            const response = fetch("http://localhost:5000/newUser", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })
            
            props.history.push("/")
        } catch (error) {
            setError("Failed to create an account")
        }
        setLoading(false)
    }

    

    return (
        <div className="d-flex flex-wrap justify-content-center position-absolute w-100 h-100 align-items-center align-content-center">
            <form onSubmit={handleSubmit}>
                <h2 className="text-center mb-4">Sign Up</h2>
                {error && <h2>{error}</h2>}
                <div id="email">
                    <label>Email</label>
                    <input className="form-control" type="email" ref={emailRef}/>
                </div>
                <div id="password">
                    <label>Password</label>
                    <input className="form-control"  type="password" ref={passwordRef}/>
                </div>
                <div id="password-confirm">
                    <label>Password Confirmation</label>
                    <input className="form-control"  type="password" ref={passwordConfirmRef}/>
                </div>
                <div id="select-user_type" className="dropdown mt-2 mb-2">
                    <label>Account Type</label>
                    <select value={formselect} onChange={e => setFormselect(e.currentTarget.value)}>
                        <option value="business_owner">Business Owner</option>
                        <option value="member">Member</option>
                        <option value="basic_user">Undecided (Regular User)</option>
                    </select>
                </div>
                <button disabled={loading} className="btn btn-success w-100 mt-3" type="submit">Sign Up</button>
            </form>
            <div className="w-100 text-center mt-2">
                Already have an account? <a href="/login">Login</a>
            </div>
        </div>
    )
}

export default Signup
