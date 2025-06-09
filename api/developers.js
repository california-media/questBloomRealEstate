export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://search-listings-production.up.railway.app/v1/developers",
      {
        method: "GET",
        headers: {
          "X-API-Key": "reelly-682aebad-HMGFdRATSsyggYB7YgAvpwjuec5tGqlz",
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
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
