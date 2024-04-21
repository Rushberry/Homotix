const express = require('express');
const app = express();

// Middleware to enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://chat.homotix.app'); // Allow requests from this origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allow the specified methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow the specified headers
  // Set other CORS headers as needed
  next();
});

// Route handling code
app.post('/request/payment/create', (req, res) => {
    // Handle the payment creation request here
    res.send('Payment creation request received');
});

app.post('/request/payment/verify', (req, res) => {
    // Handle the payment verification request here
    res.send('Payment verification request received');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
