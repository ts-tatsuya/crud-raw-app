const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { create } = require('./models/contacts');
const contacts = require('./models/contacts');


const PORT = 3000;
const URL = "mongodb://localhost/dataTest";

app.use(express.json());
app.use(express.static("src"));

mongoose.connect(URL).then(console.log('db is connected')).catch((err) => console.log(err));


app.get("/api/contacts", async(req, res) => {
    try {
        const allContacts = await contacts.find({});
        res.status(200).json(allContacts);
    } catch (error) {
        console.log(error);
    }
});

app.post("/api/contact", async(req, res) => {
    try {
        const createContacts = await contacts.create(req.body);
        res.status(200).json(createContacts);
    } catch (error) {
        console.log(error);
    }
});

app.delete("/api/contact/delete/:id", async (req, res) => {

    try {
        
        await contacts.findOneAndDelete({id: req.params.id});
        res.send(`Data with ID=${req.params.id} is deleted`);
        console.log(`Data with ID=${req.params.id} is deleted`);
    } catch (error) {
        console.log(error);
    }
});

app.patch("/api/contact/update/:id", async (req, res) => {

    try {
        
        let dataToUpdate = {
            name: req.body.inputNameUpd
        }

        await contacts.findOneAndUpdate({id: req.params.id}, dataToUpdate, {
            new: true
        });
        res.send(`Data with ID=${req.params.id} is deleted`);
        console.log(`Data with ID=${req.params.id} is deleted`);
    } catch (error) {
        console.log(error);
    }




});



app.listen(PORT, console.log('express is on'));