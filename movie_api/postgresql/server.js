const app = require('./index');
require('dotenv').config();

// Set the port
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Movie API (PostgreSQL version) is running on port ${port}`);
});
