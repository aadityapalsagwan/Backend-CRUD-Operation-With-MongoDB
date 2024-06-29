const express = require('express');
const db = require('./DB/db');
const Person = require('./models/person');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send("Welcome to the Page");
});

app.post('/person', async (req, res) => {
    try {
        const person = new Person(req.body);
        const savedPerson = await person.save();
        console.log('Person saved successfully:', savedPerson);
        res.json(savedPerson);
    } catch (err) {
        console.error('Error saving person:', err);
        res.status(400).send("Unable to save to database");
    }
});

app.get('/person', async (req, res) => {
    try {
        const persons = await Person.find();
        res.json(persons);
    } catch (err) {
        console.error('Error getting person:', err);
        res.status(404).send("Unable to fetch person from database");
    }
});

// PUT method to update a person
app.put('/person/:id', async (req, res) => {
    try {
        const updatedPerson = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedPerson) {
            return res.status(404).send("Person not found");
        }
        console.log('Person updated successfully:', updatedPerson);
        res.json(updatedPerson);
    } catch (err) {
        console.error('Error updating person:', err);
        res.status(400).send("Unable to update person in database");
    }
});

// DELETE method to delete a person
app.delete('/person/:id', async (req, res) => {
    try {
        const deletedPerson = await Person.findByIdAndDelete(req.params.id);
        if (!deletedPerson) {
            return res.status(404).send("Person not found");
        }
        console.log('Person deleted successfully:', deletedPerson);
        res.json(deletedPerson);
    } catch (err) {
        console.error('Error deleting person:', err);
        res.status(400).send("Unable to delete person from database");
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
