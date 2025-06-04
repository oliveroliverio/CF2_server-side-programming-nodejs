const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Parse the URL
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // Log the request to log.txt
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} - ${req.method} request to ${pathname}\n`;
    fs.appendFile('log.txt', logEntry, (err) => {
        if (err) console.error('Error writing to log file:', err);
    });

    // Function to serve HTML files
    const serveHtmlFile = (filePath) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading file');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    };

    // Route handling
    if (pathname.includes('documentation')) {
        serveHtmlFile('documentation.html');
    } else {
        serveHtmlFile('index.html');
    }
});

// Create initial log.txt file if it doesn't exist
if (!fs.existsSync('log.txt')) {
    fs.writeFileSync('log.txt', '');
}

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});