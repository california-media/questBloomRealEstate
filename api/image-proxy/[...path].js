export default async function handler(req, res) {
  const {
    query: { path = [] },
  } = req;

  if (!Array.isArray(path) || path.length === 0) {
    return res.status(400).send("Missing image path.");
  }

  // Reconstruct the path and URL
  const imagePath = path.join("/");
  const imageUrl = `https://api.reelly.io/vault/${imagePath}`;

  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      return res.status(response.status).send("Failed to fetch image.");
    }

    const contentType = response.headers.get("content-type");

    if (contentType) {
      res.setHeader("Content-Type", contentType);
    } else {
      // Generic fallback only if content type is truly missing
      res.setHeader("Content-Type", "application/octet-stream");
    }
    const arrayBuffer = await response.arrayBuffer();
    res.status(200).send(Buffer.from(arrayBuffer));
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
