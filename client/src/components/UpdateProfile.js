import React, {Component, Fragment, useRef, useState} from 'react'
import { useAuth, updateEmail, updatePassword } from '../contexts/AuthContext';


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
        <Fragment>
            <form onSubmit={handleSubmit}>
                <h2 className="text-center mb-4">Update Profile</h2>
                {error && <h2>{error}</h2>}
                <div id="email">
                    <label>Email</label>
                    <input className="w-100" type="email" ref={emailRef} required defaultValue={currentUser.email}/>
                </div>
                <div id="password">
                    <label>Password</label>
                    <input  className="w-100" type="password" ref={passwordRef} placeholder="Leave blank to keep the same password"/>
                </div>
                <div id="password-confirm">
                    <label>Password Confirmation</label>
                    <input className="w-100" type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same password"/>
                </div>
                <button disabled={loading} className="w-100" type="submit">Update</button>
            </form>
            <div className="w-100 text-center mt-2">
                <a href="/">Cancel</a>
            </div>
        </Fragment>
    )
}

export default UpdateProfile