export default async function handler(req, res) {
  try {
    const baseUrl =
      "https://search-listings-production.up.railway.app/v1/properties";

    // Create a URLSearchParams object from the request query
    const queryParams = new URLSearchParams(req.query);

    // Add default country if not already set
    if (!queryParams.has("country")) {
      queryParams.set("country", "United Arab Emirates");
    }

    const url = `${baseUrl}?${queryParams.toString()}`;

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
        .json({ error: "Failed to fetch properties" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
