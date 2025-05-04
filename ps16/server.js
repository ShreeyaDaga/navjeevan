const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 8001;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Send the main HTML file for all routes (single page application)
app.get('/api/art', (req, res) => {
  res.sendFile('arts.json','utf8',(err,data) => {
    
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Art Gallery server running on http://localhost:${PORT}`);
});