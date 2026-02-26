const http = require('http');
const { readFileSync, writeFileSync } = require('./files');

let users = [
    {id: 1, name: "John", age: 25}, 
    {id: 2, name: "Jane", age: 30},
    {id: 3, name: "John", age: 22},
];

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    console.log(req.url, req.method);
    const urlParts = req.url.split('/');
    const userId = urlParts[2];
    
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
        
        // Test endpoint
        if (req.url === '/test' && req.method === 'GET') {
            res.end(JSON.stringify({name: 'Bharath'}));
            return;
        }
        
        // All users with optional search
        if (req.url === '/users' && req.method === 'GET') {
            res.end(JSON.stringify(users));
            return;
        }
        
        // Search users via /users?name=
        if (req.url.includes('/users?') && req.method === 'GET') {
            const url = new URL(req.url, `http://${req.headers.host}`);
            const name = url.searchParams.get('name');
            const filtered = users.filter(u => u.name.toLowerCase().includes(name.toLowerCase()));
            res.end(JSON.stringify(filtered));
            return;
        }
        
        // Create user
        if (req.url === '/users' && req.method === 'POST') {
            const newUser = {...JSON.parse(body), id: users.length + 1};
            users.push(newUser);
            res.end(JSON.stringify({message: 'User created'}));
            return;
        }
        
        // Update user
        if (urlParts[1] === 'users' && userId && req.method === 'PUT') {
            const index = users.findIndex(u => u.id == userId);
            users[index] = JSON.parse(body);
            res.end(JSON.stringify({message: 'User updated'}));
            return;
        }
        
        // Delete user
        if (urlParts[1] === 'users' && userId && req.method === 'DELETE') {
            const index = users.findIndex(u => u.id == userId);
            users.splice(index, 1);
            res.end(JSON.stringify({message: 'User deleted'}));
            return;
        }
        
        // Get single user
        if (urlParts[1] === 'users' && userId && req.method === 'GET') {
            const index = users.findIndex(u => u.id == userId);
            res.end(JSON.stringify(users[index]));
            return;
        }
        
        // Search users via /search?name=
        if (req.url.includes('/search?') && req.method === 'GET') {
            const url = new URL(req.url, `http://${req.headers.host}`);
            const name = url.searchParams.get('name');
            const filtered = users.filter(u => u.name == name);
            res.end(JSON.stringify(filtered));
            return;
        }
        
        // Read file
        if (req.url === '/file' && req.method === 'GET') {
            const content = readFileSync();
            res.end(JSON.stringify({content}));
            return;
        }
        
        // Write file
        if (req.url === '/file' && req.method === 'POST') {
            writeFileSync(JSON.parse(body).content);
            res.end(JSON.stringify({message: "File written successfully"}));
            return;
        }
        
        res.end(JSON.stringify({error: 'Endpoint not found'}));
    });
});

server.listen(3000, () => {
    console.log('🚀 Server running on http://localhost:3000');
});


