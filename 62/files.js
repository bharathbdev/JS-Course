const fs = require('fs');

// WAY 1: Sync Reading
function readFileSync() {
    const data = fs.readFileSync('sample.txt', 'utf8');
    return data;
}



// WAY 2: Async Reading
function readFileAsync() {
    fs.readFile('sample.txt', 'utf8', (err, data) => {
        console.log(data);
    });
}

// WAY 3: Stream Reading
function readFileStream() {
    const stream = fs.createReadStream('sample.txt', 'utf8');
    stream.on('data', (chunk) => console.log(chunk));
}



// Call all functions
 readFileSync();
//  readFileAsync();
//readFileStream();



// do smae for write to fiel name sample.txt also read formsmae file

// WAY 1: Sync Writing
function writeFileSync() {
    const content = 'Hello, this is a sample text!';
    fs.writeFileSync('sample.txt', content, 'utf8');
    console.log('File written successfully (Sync)');
}

// WAY 2: Async Writing
function writeFileAsync() {
    const content = 'Hello, this is a sample text!';
    fs.writeFile('sample.txt', content, 'utf8', (err) => {
        if (err) {
            console.error('Error writing file (Async):', err);
        } else {
            console.log('File written successfully (Async)');
        }   }); }

// WAY 3: Stream Writing
function writeFileStream() {
    const content = 'Hello, this is a sample text!';
    const stream = fs.createWriteStream('sample.txt', 'utf8');
    stream.write(content);
    stream.end(() => {
        console.log('File written successfully (Stream)');
    });
}

// Call all functions
 writeFileSync();
//writeFileAsync();
 //writeFileStream();

 // Export function for use in other files
module.exports = { readFileSync, writeFileSync };
