import {React, useState, useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext'


const BecomeMember = (props) => {
    // BUSINESS OWNERS CAN NOT BE MEMBERS ON THE SAME ACCOUNT
    //YOU MUST CREATE A DIFFERENT ACCOUNT WITH ANOTHER EMAIL TO BECOME A MEMBER
    const [numMembers, setNumMembers] = useState([])
    const [currentNumber, setCurrentNumber] = useState(0)
    const [memberships, setMemberships] = useState([])
    const [updatedNumber, setUpdatedNumber] = useState(0)
    const {currentUser} = useAuth()


    async function getMemberships() {
        const email = currentUser.email
        const business = props.name
        try {
            const response = await fetch(("/members/" + email + "/" + business))
            const data = await response.json()

            setMemberships(data)
            
        } catch (error) {
            console.log(error.message)
        }
    }

    //getting the business to see current number of members before updating
    async function getBusinessMembers() {
        const business = props.name
        try {
            const response = await fetch("/businesses/getMembersByName/"+business)
            const numberOfMembers = await response.json()

            setNumMembers(numberOfMembers)
            console.log(numMembers)
        } catch (error) {
            console.log(error.message)
        }
    }
    

    async function memberHandler() {
        const email = currentUser.email
        let business = props.name
        const body = { email, business }
        
        
        
        try {
            const response = await fetch(("/becomeMember/"), {
                method: "POST",
                headers: {'Content-Type': "application/json"},
                body: JSON.stringify(body)
            })

            const response2 = await fetch(("/updateMembersByName/"+business), {
                method: "PUT",
                headers: {'Content_Type': "application/json"}
            })
            console.log(response2)
            
            window.location.reload()
        } catch (error) {
            console.error(error.message)
        }

        //updating the number of members for a business

    }

    
    useEffect(() => {
        getMemberships()
    }, [])

    useEffect(() => {
        getBusinessMembers()
    }, [])



    return (
        <div>
            {(memberships.length > 0) ? <p>Already a member</p> : <button className="btn btn-primary" onClick={memberHandler}>Become a Member</button>}
            <div>
                <strong>Number of Members:</strong>{numMembers.map(value => (
                    <div>
                        <p>{value.num_members}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BecomeMember
