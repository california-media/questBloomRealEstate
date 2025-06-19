export default async function handler(req, res) {
  const baseUrl = "https://search-listings-production.up.railway.app/v1/areas";

  try {
    // Create a mutable URLSearchParams object
    const queryParams = new URLSearchParams(req.query);

    // Add default country if not provided
    if (!queryParams.has("country")) {
      queryParams.set("country", "United Arab Emirates");
    }

    // Construct final URL
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
        .json({ error: "Failed to fetch areas" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
