const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Express server exercise!' });
});

// Example route with URL parameters
app.get('/users/:id', (req, res) => {
  res.json({ 
    message: 'User details route',
    userId: req.params.id 
  });
});

// Example POST route
app.post('/data', (req, res) => {
  const data = req.body;
  res.json({ 
    message: 'Data received',
    data: data 
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
