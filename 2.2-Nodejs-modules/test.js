const http = require('http');

// Test function to make a request to our server
function testServer() {
    const options = {
        hostname: 'localhost',
        port: 8080,
        path: '/',
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        console.log(`Status Code: ${res.statusCode}`);

        res.on('data', (chunk) => {
            console.log('Response body:', chunk.toString());
        });
    });

    req.on('error', (error) => {
        console.error('Error testing server:', error);
    });

    req.end();
}

// Only run the test if this file is run directly
if (require.main === module) {
    testServer();
}