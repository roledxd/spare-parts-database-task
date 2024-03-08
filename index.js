const express = require('express');
const csvReader = require('./modules/csvReader');
const filter = require('./modules/filter');
const pagination = require('./modules/pagination');

require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3300;
const DATA_FILE = process.env.DATA_FILE || null;

// Define middleware to handle '/spare-parts' route
app.get('/spare-parts', async (req, res) => {
  try {
    if (!DATA_FILE) {
      res.status(200).json([]);
    };
    // Read CSV file and retrieve parts data
    const parts = await csvReader.readCSV(DATA_FILE);

    // Filter and paginate parts data based on request query parameters
    const filteredParts = filter.filterParts(parts, req.query);
    const paginatedParts = pagination.paginate(filteredParts, req.query);

    // Send paginated parts data as JSON response
    res.json(paginatedParts);
  } catch (error) {
    // Handle errors and send 500 status code with error message
    console.error('Error:', error);
    res.status(500).json({
      error: error.message
    });
  }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/spare-parts`);
});