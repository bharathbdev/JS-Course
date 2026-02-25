const http = require('http');
const { readFileSync, writeFileSync } = require('./files');

// Our fake database - just an array of objects
let users = [
    {id: 1, name: "John", age: 25}, 
    {id: 2, name: "Jane", age: 30}
];

// Create server
const server = http.createServer((req, res) => {
    // Set headers so browser can call our API
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    console.log(req.url, req.method);

    // Get URL parts: /users/1 -> ['', 'users', '1'] 
    const urlParts = req.url.split('/');
    const userId = urlParts[2]; // Get ID if exists
    
    // Get request body (payload)
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
        
        // Simple test endpoint
        if (req.url === '/test' && req.method === 'GET') {
            const data = {
                name: 'Bharath',
            };
            const finalData = JSON.stringify(data);
            res.end(finalData);
            return;
        }
        // File reading endpoint
        if (req.url === '/file' && req.method === 'GET') {
            const fileContent = readFileSync();
            res.end(JSON.stringify({content: fileContent}));
            return;
        }
        
        // File writing endpoint
        if (req.url === '/file' && req.method === 'POST') {
            const requestData = JSON.parse(body);
            const result = writeFileSync(requestData.content);
            res.end(JSON.stringify({message: result}));
            return;
        }
        
        // Check if URL starts with /users (fixes single user GET)
        if(req.url.startsWith('/users')) {
        // GET: Return all users or single user
        if (req.method === 'GET') {
            if (userId) {
                // Find user using findIndex
                const userIndex = users.findIndex((v, i, a) => {
                    return v.id == userId;
                });
                const user = userIndex !== -1 ? users[userIndex] : null;
                let finalData;
                if (user) {
                    finalData = user;
                } else {
                    finalData = {error: 'User not found'};
                }
                res.end(JSON.stringify(finalData));
            } else {
                // Check if there are query parameters for search
                const url = new URL(req.url, `http://${req.headers.host}`);
                const searchName = url.searchParams.get('name');
                
                if (searchName) {
                    // Search users by name using filter
                    const filteredUsers = users.filter((v, i, a) => {
                        return v.name.toLowerCase().includes(searchName.toLowerCase());
                    });
                    const searchResponse = JSON.stringify(filteredUsers);
                    res.end(searchResponse);
                } else {
                    // Return all users
                    const allUsersResponse = JSON.stringify(users);
                    res.end(allUsersResponse);
                }
            }
        }
        
        // POST: Create new user
        else if (req.method === 'POST') {
            const newUser = JSON.parse(body);
            newUser.id = users.length + 1;
            users.push(newUser);
            const response = JSON.stringify(newUser);
            res.end(response);
        }
        
        // PUT: Update user
        else if (req.method === 'PUT') {
            const updateData = JSON.parse(body);
            // Find user index using findIndex
            const userIndex = users.findIndex((v, i, a) => {
                return v.id == userId;
            });
            if (userIndex !== -1) {
                const updatedUser = {...updateData};
                users[userIndex] = updatedUser;
                res.end(JSON.stringify(updatedUser));
            } else {
                const errorResponse = {error: 'User not found'};
                res.end(JSON.stringify(errorResponse));
            }
        }
        
        // DELETE: Remove user using splice
        else if (req.method === 'DELETE') {
            // Find user index using findIndex
            const userIndex = users.findIndex((v, i, a) => {
                return v.id == userId;
            });
            if (userIndex !== -1) {
                users.splice(userIndex, 1);
                const successResponse = {message: 'User deleted'};
                res.end(JSON.stringify(successResponse));
            } else {
                const errorResponse = {error: 'User not found'};
                res.end(JSON.stringify(errorResponse));
            }
        }
    } else {
        const errorResponse = {error: 'Endpoint not found'};
        res.end(JSON.stringify(errorResponse));
    }
    });
});

// Start server on port 3000
server.listen(3000, () => {
    console.log('🚀 Server running on http://localhost:3000');
    console.log('Try: GET http://localhost:3000/users');
});


