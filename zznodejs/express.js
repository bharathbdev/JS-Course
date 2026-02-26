const express = require('express');
const { readFileSync, writeFileSync } = require('./files');

const app = express();
app.use(express.json());

let users = [
    {id: 1, name: "John", age: 25}, 
    {id: 2, name: "Jane", age: 30},
    {id: 3, name: "John", age: 22},
];

app.get('/test', (req, res) => {
    res.json({name: 'Bharath'});
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    const newUser = {...req.body, id: users.length + 1};
    users.push(newUser);
    res.json({message: 'User created'});
});

app.put('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id == req.params.id);
    users[index] = req.body;
    res.json({message: 'User updated'});
});

app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id == req.params.id);
    users.splice(index, 1);
    res.json({message: 'User deleted'});
});

app.get('/users/:id', (req, res) => {
    let id = req.params.id;
    const index = users.findIndex(u => u.id == id);
    res.json(users[index]);
});

app.get('/search', (req, res) => {
    const name = req.query.name;
    const filtered = users.filter(u => u.name == name);
    return res.json(filtered);
});



// File endpoints
app.get('/file', (req, res) => {
    const content = readFileSync();
    res.json({content});
});

app.post('/file', (req, res) => {
    writeFileSync(req.body.content);
    res.json({message: "File written successfully"});
});

app.listen(3000, () => {
    console.log('🚀 Server running on http://localhost:3000');
});


