const app = require('./index');
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Handle server errors
server.on('error', (error) => {
    console.error('Server error:', error);
});