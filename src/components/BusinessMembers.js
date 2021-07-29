import {React, useState, useEffect} from 'react'

const BusinessMembers = (props) => {

    const [members, setMembers] = useState([])
    const businessName = props.business

    async function getMembers() {
        try {
            const url = "http://localhost:5000/allMembers/" + businessName

            const response = await fetch(url)
            const data = await response.json()

            setMembers(data)
            console.log(data)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getMembers()
    }, [])

    return (
        <div>
            {members.map(member => (
                <div>
                    <p>{member.email}</p>
                </div>
            ))}
        </div>
    )
}

export default BusinessMembers
