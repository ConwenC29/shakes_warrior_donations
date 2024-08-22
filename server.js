const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve your static HTML, CSS, JS files

// MongoDB connection
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// Schema and Model
const collectionSchema = new mongoose.Schema({
    name: String,
    address: String,
    area: String,
    availableTime: String,
    contactNumber: String,
    altContactName: String,
    altContactNumber: String,
    status: { type: String, default: 'Pending Collection' }
});

const Collection = mongoose.model('Collection', collectionSchema);

// API Route to save form data
app.post('/api/collections', (req, res) => {
    const newCollection = new Collection(req.body);
    newCollection.save((err) => {
        if (err) return res.status(500).send(err);
        res.status(200).send('Collection scheduled successfully!');
    });
});

// API Route to get all collections
app.get('/api/collections', (req, res) => {
    Collection.find({}, (err, collections) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(collections);
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
