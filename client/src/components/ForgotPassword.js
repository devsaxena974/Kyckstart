import React, {Fragment, useRef, useState} from 'react'
import { useAuth } from '../contexts/AuthContext';
import auth from './auth';


const ForgotPassword = (props) => {
    const emailRef = useRef(null);
    const { resetPassword } = useAuth()
    const[error, setError] = useState()
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("")
    

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Check your inbox for further instructions")
        } catch {
            setError("Failed to reset password")
        }
        setLoading(false)
    }

    return (
        <div className="d-flex flex-wrap justify-content-center position-absolute w-100 h-100 align-items-center align-content-center">
            <form onSubmit={handleSubmit}>
                <h2 className="text-center mb-4">Password Reset</h2>
                {error && <h2>{error}</h2>}
                <div id="email">
                    <label>Email</label>
                    <input className="form-control" type="email" ref={emailRef}/>
                </div>
                <button disabled={loading} className="btn btn-success w-100 mt-3" type="submit">
                    Reset Password
                </button>
            </form>
            <div className="mt-5 text-center w-100">
                <a href="/login">Login</a>
            </div>
            <div className="w-100 text-center mt-2">
                Don't have an account? <a href="/signup">Sign Up</a>
            </div>
        </div>
    )
}

export default ForgotPassword