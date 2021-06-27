const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const fileUpload = require('express-fileupload')

//middleware
app.use(cors());
app.use(express.json());//allows us to use request.body and get json data
app.use(fileUpload())

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
        const {member_price} = req.body
        const {member_perks} = req.body
        const {imgPath} = req.body
       
        const newBusiness = pool.query(
            "INSERT INTO businesses (name, type, phone, address, city, state, country, email, description, member_price, member_perks, image_path) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
            [name, type, phone, address, city, state, country, email, description, member_price, member_perks, imgPath])
        
        // res.json(newBusiness.rows[0])
    } catch (error) {
        console.error(error.message);
    }
})

//upload file

app.post("/uploadImage", (req, res) => {
    if(req.files === null) {
        return res.json({ msg: 'No file was uploaded' })
    }

    const file = req.files.file;

    file.mv(`C:/Users/Devanshu Saxena/kyckstart/client/public/uploads/${file.name}`, err => {
        if(err) {
            console.error(err)
            return res.status(500).send();
        }

        return res.json({ fileName: file.name, filePath: `/uploads/${file.name}` })
    })
})

//get image path:
app.get("business/getImage/:email", async(req, res) => {
    try {
        const {email} = req.params
        const query = await pool.query("SELECT image_path FROM businesses WHERE email=$1", [email])
    } catch (error) {
        console.error(error.message)
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

//update name

app.put("/businesses/editName/:email", async(req,res) => {
    try {
        
        const {email} = req.params
        const {name} = req.body
        const updateBusiness = await pool.query("UPDATE businesses SET name=$1 WHERE email=$2",
        [name, email])

        res.json("Business was updated")

    } catch (error) {
        console.error(error.message)
    }
})

//update type

app.put("/businesses/editType/:email", async(req,res) => {
    try {
        
        const {email} = req.params
        const {type} = req.body
        const updateBusiness = await pool.query("UPDATE businesses SET type=$1 WHERE email=$2",
        [type, email])

        res.json("Business was updated")

    } catch (error) {
        console.error(error.message)
    }
})

//update description

app.put("/businesses/editDescription/:email", async(req,res) => {
    try {
        
        const {email} = req.params
        const {description} = req.body
        const updateBusiness = await pool.query("UPDATE businesses SET description=$1 WHERE email=$2",
        [description, email])

        res.json("Business was updated")

    } catch (error) {
        console.error(error.message)
    }
})

//update member price

app.put("/businesses/editPrice/:email", async(req,res) => {
    try {
        
        const {email} = req.params
        const {price} = req.body
        const updateBusiness = await pool.query("UPDATE businesses SET member_price=$1 WHERE email=$2",
        [price, email])

        res.json("Business was updated")

    } catch (error) {
        console.error(error.message)
    }
})

//update member perks

app.put("/businesses/editPerks/:email", async(req,res) => {
    try {
        
        const {email} = req.params
        const {perks} = req.body
        const updateBusiness = await pool.query("UPDATE businesses SET member_perks=$1 WHERE email=$2",
        [perks, email])

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