export default async function handler(req, res) {
  try {
    // Base API endpoint
    const baseUrl =
      "https://search-listings-production.up.railway.app/v1/properties";

    // Convert query params to a URL-encoded query string (e.g., ?region=Dubai&limit=10)
    const searchParams = new URLSearchParams(req.query).toString();
    const url = searchParams ? `${baseUrl}?${searchParams}` : baseUrl;

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
