// ========== NODE.JS BUILT-IN MODULES EXAMPLES ==========

// 1. PATH MODULE - Working with file and directory paths
const path = require('path');
console.log('=== PATH MODULE ===');
console.log('Current file:', __filename);
console.log('Directory name:', path.dirname(__filename));
console.log('File extension:', path.extname(__filename));

// 2. CRYPTO MODULE - Encryption and hashing
const crypto = require('crypto');
const hash = crypto.createHash('sha256').update('hello world').digest('hex');
console.log('SHA256 hash:', hash);

// 3. URL MODULE - Parse and work with URLs
const url = require('url');
const myUrl = new URL('https://example.com:8080/path?name=john');
console.log('Hostname:', myUrl.hostname);
console.log('Port:', myUrl.port);
console.log('Pathname:', myUrl.pathname);
console.log('Search params:', myUrl.searchParams.get('name'));


// 4. QUERYSTRING MODULE - Parse query strings
const querystring = require('querystring');
const parsed = querystring.parse('name=john&age=25&city=new%20york');
console.log('Parsed query:', parsed);

// 5. BUFFER MODULE - Working with binary data
const buffer1 = Buffer.from('Hello World', 'utf8');
console.log('Buffer from string:', buffer1);

console.log('myname value:', process.env.myname);

