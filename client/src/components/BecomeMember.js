import {React, useState, useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext'


const BecomeMember = (props) => {
    // BUSINESS OWNERS CAN NOT BE MEMBERS ON THE SAME ACCOUNT
    //YOU MUST CREATE A DIFFERENT ACCOUNT WITH ANOTHER EMAIL TO BECOME A MEMBER
    const [becomeMember, setBecomeMember] = useState([])
    const [memberships, setMemberships] = useState([])
    const [showJoin, setShowJoin] = useState(true)
    const {currentUser} = useAuth()


    async function getMemberships() {
        const email = currentUser.email
        const business = props.name
        try {
            const response = await fetch(("http://localhost:5000/members/" + email + "/" + business))
            const data = await response.json()

            setMemberships(data)
            console.log(data)
            console.log(business)
            
            
        } catch (error) {
            console.log(error.message)
        }
    }
    

    async function memberHandler() {
        const email = currentUser.email
        let business = props.name
        const body = { email, business }
        console.log(body)
        
        try {
            const response = await fetch(("http://localhost:5000/becomeMember/"), {
                method: "POST",
                headers: {'Content-Type': "application/json"},
                body: JSON.stringify(body)
            })

            
            window.location.reload()
        } catch (error) {
            console.error(error.message)
        }
    }

    
    useEffect(() => {
        getMemberships()
    }, [])



    return (
        <div>
            {(memberships.length > 0) ? <p>Already a member</p> : <button className="btn btn-primary" onClick={memberHandler}>Become a Member</button>}
        </div>
    )
}

export default BecomeMember
