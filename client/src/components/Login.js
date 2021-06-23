import React, {Fragment, useRef, useState} from 'react'
import { useAuth } from '../contexts/AuthContext';

const Login = (props) => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const { login } = useAuth()
    const[error, setError] = useState()
    const [loading, setLoading] = useState(false);
    

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            props.history.push("/")
        } catch {
            setError("Failed to sign in")
        }
        setLoading(false)
    }

    return (
        <div className="d-flex flex-wrap justify-content-center position-absolute w-100 h-100 align-items-center align-content-center">
            <form onSubmit={handleSubmit}>
                <h2 className="text-center mb-4">Login</h2>
                {error && <h2>{error}</h2>}
                <div id="email">
                    <label>Email</label>
                    <input className="form-control" type="email" ref={emailRef}/>
                </div>
                <div id="password">
                    <label>Password</label>
                    <input className="form-control" type="password" ref={passwordRef}/>
                </div>
                <button disabled={loading} className="btn btn-success w-100 mt-3" type="submit" >
                    Login
                </button>
            </form>
            <div className="mt-5 text-center w-100">
                <a href="/forgot-password">Forgot Password?</a>
            </div>
            <div className="w-100 text-center mt-2">
                Don't have an account? <a href="/signup">Sign Up</a>
            </div>
        </div>
    )
}

export default Login
