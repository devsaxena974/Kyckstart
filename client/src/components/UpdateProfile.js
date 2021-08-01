import {React, useRef, useState} from 'react'
import { useAuth} from '../contexts/AuthContext';
import { Link } from 'react-router-dom';


const UpdateProfile = (props) => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordConfirmRef = useRef(null);
    const {currentUser, updateEmail, updatePassword} = useAuth()
    const[error, setError] = useState()
    const [loading, setLoading] = useState(false)
    

    function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        const promises = []
        setError('')
        setLoading(true)
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordConfirmRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises)
            .then(() => {
                props.history.push("/")
            }).catch(() => {
                setError("Failed to update")
            }).finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className="d-flex flex-wrap justify-content-center w-100 h-100 align-items-center align-content-center">
            <form onSubmit={handleSubmit} className="form-control mt-5 mb-5">
                <h2 className="text-center mb-4">Update Profile</h2>
                {error && <h2>{error}</h2>}
                <div id="email" className="mt-2">
                    <label>Email</label>
                    <input className="from-control w-100" type="email" ref={emailRef} required defaultValue={currentUser.email}/>
                </div>
                <div className="mt-2" id="password">
                    <label>Password</label>
                    <input  className="from-control w-100" type="password" ref={passwordRef} placeholder="Leave blank to keep the same password"/>
                </div>
                <div id="password-confirm mt-2 mb-2">
                    <label>Password Confirmation</label>
                    <input className="form-control w-100 mb-2" type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same password"/>
                </div>
                <button disabled={loading} className=" btn btn-success w-100" type="submit">Update</button>
            </form>
            <div className="w-100 text-center mt-2">
                <Link className="btn btn-danger" to="/">Cancel</Link>
            </div>
        </div>
    )
}

export default UpdateProfile