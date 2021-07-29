import React from 'react'
import { Link } from 'react-router-dom'
import {GrGithub} from "react-icons/gr"
import {FaLinkedin} from "react-icons/fa"

const About = () => {
    return (
        <div className="container mt-2">
            <div className="float-right">
                <Link className="btn btn-success ml-2" to="/">Home</Link>
            </div>
            <div className="mt-4">
                <h1>Kyckstart</h1>
                <p className="mt-5"> &emsp;Kyckstart is an online platform designed to assist small businesses in attracting new customers. By choosing to become a member of a business,
                    customers share their emails with the business owners in order to receive newsletters, updates, and member specific information and discounts
                    provided by businesses. All businesses are manually vetted to insure that there are no breaches of private information or security.
                </p>
                <h3 className="mt-5">For Members:</h3>
                <p>&emsp;To become a member of a business, open the detail box of a business from either the home page or from the browsing page and click 'Become Member'.
                    This will give businesses your email allowing them to communicate with you. You may cancel a membership with a business at any time by going to the memberships
                    tab on your home page and clicking the red 'Cancel Membership' button. This will remove your email from the list stored in our database and businesses will no
                    longer see your email in their list of members.
                </p>
                <h3 className="mt-5">For Businesses:</h3>
                <p>&emsp;To register a business on Kyckstart, you must first create an account. At the bottom of the page is a link to join Kyckstart as a business owner and you
                    must fill out the form that appears when the link is clicked to register your business. Although it is not required that all fields in the form be completed, it will
                    make your business a lot more marketable and attract more customers if all fields are filled out. Just fill out all the fields please. Once you have registered your
                    business, you can edit your business and see all the email addresses of all the members of the business which makes it easier to communicate with potential customers
                    and clients.
                </p>
                <h3 className="mt-5">The Creation of Kyckstart:</h3>
                <p>&emsp;Kyckstart was founded by Dev Saxena in 2021 after the Covid-19 pandemic hurt smaller scale businesses all around the world. The website makes no profit and
                    was created to act as a middleman in connecting businesses with new customers. If you wish to contact Dev or want to see more of his projects, the links are listed below.
                </p>
                <div className="mt-5">
                    <button className="btn btn-primary" style={{backgroundColor: "purple"}} onClick={e => window.open("https://github.com/devsaxena974")}><GrGithub /> Github</button>
                    <button className="btn btn-primary ml-2" onClick={e => window.open("https://www.linkedin.com/in/devanshusaxena/")}><FaLinkedin /> Linkedin</button>
                </div>
            </div>
        </div>
    )
}

export default About
