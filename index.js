const fs = require('fs');
const http = require('http');
require('dotenv').config();


const envVarName = 'COUNTRY_CODE'; // Change this to the variable you want to read
const countryCode = process.env[envVarName];

console.log("countryCode : " + countryCode);

// Function to get translation based on country code parameter
function getTranslation(countryCode, callback) {
    
    fs.readFile('translations.json', 'utf8', (err, data) => {
        if (err) {
            return callback(err);
        }
        try {
            const translations = JSON.parse(data).translations;
            const translation = translations[countryCode.toUpperCase()];                
            if (!translation) {
                return callback(new Error('Translation not found for the specified country code.'));
            }
            return callback(null, translation);
        } catch (err) {
            return callback(err);
        } 
    });
}

// Create an HTTP server
const server = http.createServer((req, res) => {
    if (!countryCode) {
        console.log(" NO Country Code: " );    
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        return res.end('Country code parameter is required.');
    }
    getTranslation(countryCode, (err, translation) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            return res.end(err.message);
        }
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(translation);
    });
});

// Start the server
const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});