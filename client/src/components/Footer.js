import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const Footer = (props) => {
    
    return (
        <>
            <div className="mt-5 text-center">
                <h3>List your business on Kyckstart:</h3>
                <a href="/join">Join Kyckstart</a>
            </div>
        </>
    )
}

export default Footer
