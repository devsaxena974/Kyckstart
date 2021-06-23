const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());//allows us to use request.body and get json data

//ROUTES//



//create a business

app.post("/businesses", async(req, res) => {
    try {
        const {name} = req.body
        const {type} = req.body
        const {phone} = req.body
        const {address} = req.body
        const {city} = req.body
        const {state} = req.body
        const {country} = req.body
        const {email} = req.body
        const {description} = req.body
       
        const newBusiness = pool.query("INSERT INTO businesses (name, type, phone, address, city, state, country, email, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
         [name, type, phone, address, city, state, country, email, description])
        
        // res.json(newBusiness.rows[0])
    } catch (error) {
        console.error(error.message);
    }
})

// get all businesses

app.get("/businesses", async(req, res) => {
    try {
        const allBusinesses = await pool.query("SELECT * FROM businesses");
        res.json(allBusinesses.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//get a business

// app.get("/businesses/:id", async(req,res) => {
//     try {
        
//         const {id} = req.params
//         const business = await pool.query("SELECT * FROM businesses WHERE business_id=$1", [id])
        
//         res.json(business.rows)

//     } catch (error) {
//         console.error(error.message)
//     }
// })

//fetch a business via email

app.get("/businesses/:email", async(req, res) => {
    try {
        const {email} = req.params
        const getEmailBusiness = await pool.query("SELECT * FROM Businesses WHERE email=$1", [email])

        res.json(getEmailBusiness.rows)
    } catch (error) {
        console.error(error.message)
    }
})

//update a business

app.put("/businesses/:id", async(req,res) => {
    try {
        
        const {id} = req.params
        const {name} = req.body
        const updateBusiness = await pool.query("UPDATE businesses SET name=$1 WHERE business_id=$2", [name, id])

        res.json("Business was updated")

    } catch (error) {
        console.error(error.message)
    }
})

//delete a business

app.delete("/businesses/:id", async(req,res) => {
    try {
        
        const {id} = req.params
        const deleteBusiness = await pool.query("DELETE FROM businesses WHERE id=$1", [id])

        res.json("Business was deleted.")

    } catch (error) {
        console.error(error.message)
    }
})

app.listen(5000, () => {
    console.log("server has started on port 5000");
});