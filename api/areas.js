export default async function handler(req, res) {
  // Base URL
  const baseUrl = "https://search-listings-production.up.railway.app/v1/areas";

  // Build the query string from any query params in the request
  const queryString = new URLSearchParams(req.query).toString();
  const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-API-Key": "reelly-682aebad-HMGFdRATSsyggYB7YgAvpwjuec5tGqlz",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch areas" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
