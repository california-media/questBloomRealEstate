const { default: axios } = require("axios");
const express = require("express");
const serverless = require("serverless-http");

const app = express();

app.get("/properties", async (req, res) => {
  const { data } = await axios.get(
    "https://search-listings-production.up.railway.app/v1/properties",
    {
      headers: {
        "X-API-Key": "reelly-682aebad-HMGFdRATSsyggYB7YgAvpwjuec5tGqlz",
        "Content-Type": "application/json",
      },
    }
  );
  res.json({ data });
});
// Export for Vercel
module.exports.handler = serverless(app);

// Enable local dev with `node api/index.js`
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(
      `Express API is running locally on http://localhost:${PORT}/api/hello`
    );
  });
}
