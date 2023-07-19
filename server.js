// Import required modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const helmet = require("helmet");

// Set the port number
const port = 5000;

// Enable Helmet middleware for enhanced security
app.use(helmet());

// Parse JSON request bodies
app.use(express.json());
app.use(bodyParser.json());

//This endpoint searches for media items on iTunes based on the provided search term and media type.
app.get(`/search`, async (req, res) => {
  // Extract the search term and media type from the query parameters
  const term = req.query.term;
  const media = req.query.media;

  try {
    // Send a request to the iTunes API to search for media items
    const response = await fetch(
      `https://itunes.apple.com/search?term=${term}&media=${media}&limit=30`
    );

    // Extract the response data as JSON
    const data = await response.json();

    // Send the search results in the response
    res.send({
      message: "Search was successful",
      data: data.results,
    });
  } catch (error) {
    // Handle any errors that occur during the search
    console.error(error);
    res.status(500).send({
      message: "There seems to be an error",
      error: error.message,
    });
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}..`);
});

// Export the app module
module.exports = app;
