// Simple Node.js server to serve the API data
// Run with: node server.js
// Then visit http://localhost:3000

const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(__dirname));

// API endpoint for users data
app.get('/api/users', (req, res) => {
    res.json({
        users: [
            { id: 1, name: 'John', age: 25 },
            { id: 2, name: 'Sarah', age: 30 }
        ]
    });
});

// API endpoint for registration
app.post('/api/register', express.json(), (req, res) => {
    const { name, age, password } = req.body;
    
    // Simulate processing delay
    setTimeout(() => {
        res.json({
            success: true,
            message: 'User registered successfully',
            user: { id: Date.now(), name, age }
        });
    }, 1500);
});

// API endpoint for sign in
app.post('/api/signin', express.json(), (req, res) => {
    const { name, password } = req.body;
    
    // Simulate processing delay
    setTimeout(() => {
        if (name && password) {
            res.json({
                success: true,
                message: 'Login successful',
                user: { id: 1, name, loginTime: new Date().toLocaleString() }
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
    }, 1000);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Open demo-index.html to start learning!');
});

// Instructions to run:
// 1. npm init -y
// 2. npm install express  
// 3. node server.js