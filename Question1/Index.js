//importing the required modules
const express = require('express');
const axios = require('axios');

//Express app initiation
const app = express();
const PORT = 8008;

//Describing the route
app.get('/numbers', async (req, res) => {
  const urls = req.query.url || [];
  const timeout = 500;
  const mergedNumbers = [];

  try {
    const requests = urls.map(async (url) => {
      try {
        const response = await axios.get(url, { timeout });

        // Checking the validity
        if (Array.isArray(response.data.numbers)) {
          mergedNumbers.push(...response.data.numbers);
        } else {
          console.error(`Invalid numbers array from ${url}`);
        }
      } catch (error) {
        console.error(`Error fetching from ${url}: ${error.message}`);
      }
    });

    await Promise.all(requests);


    const uniqueSortedNumbers = [...new Set(mergedNumbers)].sort((a, b) => a - b);


    res.json({ numbers: uniqueSortedNumbers });
  } catch (error) {
    console.error(`Error processing requests: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//using port 8008
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

