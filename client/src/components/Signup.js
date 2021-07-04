import React, {Component, Fragment, useRef, useState} from 'react'
import { useAuth } from '../contexts/AuthContext';


const Signup = (props) => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordConfirmRef = useRef(null);
    const {signup} = useAuth()
    const[error, setError] = useState()
    const [loading, setLoading] = useState(false)

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
            const body = {email}

            const response = await fetch("http://localhost:5000/newUser", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })
            console.log(response)
            props.history.push("/login")
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
                <button disabled={loading} className="btn btn-success w-100 mt-3" type="submit">Sign Up</button>
            </form>
            <div className="w-100 text-center mt-2">
                Already have an account? <a href="/login">Login</a>
            </div>
        </div>
    )
}

export default Signup
