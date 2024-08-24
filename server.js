const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve your static HTML, CSS, JS files

// Initialize Supabase client
const supabaseUrl = 'https://ritieslzfvjxgpfayzzg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpdGllc2x6ZnZqeGdwZmF5enpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MTYwNzUsImV4cCI6MjA0MDA5MjA3NX0.2FWU35eUL470Jx6FsKEaM9IXcWJSLpnRgTSI56YgXsY';
const supabase = createClient(supabaseUrl, supabaseKey);

// API Route to save form data
app.post('/api/collections', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('Collections') // Updated table name
            .insert([{
                Name: req.body.Name,
                Address: req.body.Address,
                Area: req.body.Area,
                AvailableTime: req.body.AvailableTime,
                ContactNumber: req.body.ContactNumber,
                AltName: req.body.AltName,
                AltNumber: req.body.AltNumber,
                Status: req.body.Status || 'Pending Collection' // Default status if not provided
            }]);

        if (error) throw error;
        res.status(200).send('Collection scheduled successfully!');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// API Route to get all collections
app.get('/api/collections', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('Collections') // Updated table name
            .select('*');

        if (error) throw error;
        res.status(200).json(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
