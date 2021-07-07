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
        try {
            const response = await fetch("http://localhost:5000/members/" + email)
            const data = await response.json()

            setMemberships(data)
            memberships.map((members) => {
                if(members.business === props.name) {
                    setShowJoin(false) 
                    return
                } else {setShowJoin(true)}
            })
            console.log(showJoin)
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
            {props.name}
            {/* {memberships.map(members => (
                <div>
                    {(members.business) === props.name ? 
                        <p>You are already a member</p>
                        : <button className="btn btn-primary" onClick={memberHandler}>Become a Member</button>
                    }
                </div>
            ))} */}
            {(showJoin) ? <button className="btn btn-primary" onClick={memberHandler}>Become a Member</button>: <p>Already a member</p>}
            
        </div>
    )
}

export default BecomeMember
