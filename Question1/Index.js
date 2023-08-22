//importing the required modules 
const express = require('express');
const axios = require('axios');

//Express app initiation
const app = express();
const PORT = 8008;

//Defined the route
app.get('/numbers', async (req, res) => {
  // Get the list of URLs from query parameters
  const urls = req.query.url || [];
  const timeout = 500;
  const mergedNumbers = [];

  try {
    //looping on each url to get the numbers
    const requests = urls.map(async (url) => {
      try {
        const response = await axios.get(url, { timeout });
        const numbers = response.data.numbers;

        // Checking the validity
        if (Array.isArray(numbers)) {
          mergedNumbers.push(...numbers);
        } else {
          console.error(`Invalid numbers from array ${url}`);
        }
      } catch (error) {
        console.error(`Error fetching  ${url}: ${error.message}`);
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

// Starting the server -- it is using the port 8008 as mentioned in question
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
