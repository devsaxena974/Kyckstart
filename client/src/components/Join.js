import React, { Fragment, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import axios from 'axios'


const Join = (props) => {

    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [description, setDesciption] = useState("")
    const [member_price, setMember_price] = useState("")
    const [member_perks, setMember_perks] = useState("")
    const [user_type, setuser_type] = useState('basic_user')
    const [file, setFile] = useState('')
    const [filename, setFilename] = useState('Choose File')
    const [uploadedFile, setUploadedFile] = useState({})
    const [uploadSuccess, setUploadSuccess] = useState()
    const [uploadError, setUploadError] = useState(null)
    const [message, setMessage] = useState('No File Uploaded')
    const {currentUser} = useAuth();

    const onChange = (e) => {
        setFile(e.target.files[0])
        setFilename(e.target.files[0].name)
    }

    const onSubmitFile = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('file', file)
        //uploading the file:
        try {
            const res = await axios.post(('http://localhost:5000/uploadImage/'), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            const { fileName, filePath} = res.data
            setUploadedFile({ fileName, filePath })
            setUploadSuccess(true)
            setUploadError(false)
            setMessage('File Uploaded Successfully')
        } catch (error) {
            if(error.response.status === 500) {
                setUploadSuccess(false)
                setMessage('Error uploading file')
            } else {
                setUploadSuccess(false)
                setMessage('Error uploading file')
            }
        }
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()
        const email = currentUser.email
        let imgPath = uploadedFile.filePath;
        try {
            const body = { name, type, phone, address, city, state, country, email, description, member_price, member_perks, imgPath}
            
            const businessResponse = await fetch("http://localhost:5000/businesses", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

            console.log("business added")
            props.history.push("/")
        } catch (error) {
            console.error(error.message)
        }
    }

    

    return (
        <Fragment>
            <div className="d-flex justify-content-center position-absolute mt-15 mb-15 w-100 h-100 align-items-center align-content-center">
                
                <form className="mt-5">
                    <h3>Add your business on Kyckstart</h3>
                    <h5>Business Name:</h5>
                    <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)}></input>
                    <h5>Business Type:</h5>
                    <input type="text" className="form-control" value={type} onChange={e => setType(e.target.value)}></input>
                    <h5>Description:</h5>
                    <input type="text" className="form-control" value={description} onChange={e => setDesciption(e.target.value)}></input>
                    <h5>Contact Phone (ex: 012-345-6789):</h5>
                    <input type="text" className="form-control" value={phone} onChange={e => setPhone(e.target.value)}></input>
                    <h5>Address:</h5>
                    <input type="text" className="form-control" value={address} onChange={e => setAddress(e.target.value)}></input>
                    <h5>City:</h5>
                    <input type="text" className="form-control" value={city} onChange={e => setCity(e.target.value)}></input>
                    <h5>State:</h5>
                    <input type="text" className="form-control" value={state} onChange={e => setState(e.target.value)}></input>
                    <h5>Country:</h5>
                    <input type="text" className="form-control" value={country} onChange={e => setCountry(e.target.value)}></input>
                    <h5>Member Price (ex: 7.99 or 19.00):</h5>
                    <input type="text" className="form-control" value={member_price} onChange={e => setMember_price(e.target.value)}></input>
                    <h5>Member Perks (Free monthly coupons for groceries):</h5>
                    <input type="text" className="form-control" value={member_perks} onChange={e => setMember_perks(e.target.value)}></input>
                    <h5>Upload a picture that best represents your business: </h5>
                    <div className="custom-file mb-5">
                        <input className="form-control" type="file" id="formFile" onChange={onChange} />
                        <button className="btn btn-primary btn-block mt-4 mb-5" onClick={onSubmitFile}>Upload</button>
                    </div>
                    {(uploadSuccess === true && uploadError === false) ? <div className="alert alert-success">{message}</div>:
                        <div className="alert alert-danger">{message}</div>}
                    <button className="btn btn-success mt-3" onClick={onSubmitForm}>Add</button>
                    <Link className="btn btn-danger mt-3 ml-2" to="/">Cancel</Link>
                </form>
                
            </div>
        </Fragment>
    )
}

export default Join
