export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    const {
      subject = "New Contact Form Submission",
      first_name,
      last_name,
      email,
      notes,
    } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !email || !notes) {
      return res.status(422).json({
        success: false,
        errors: {
          first_name: !first_name
            ? ["The first name field is required."]
            : null,
          last_name: !last_name ? ["The last name field is required."] : null,
          email: !email ? ["The email field is required."] : null,
          notes: !notes ? ["The notes field is required."] : null,
        },
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(422).json({
        success: false,
        errors: {
          email: ["The email must be a valid email address."],
        },
      });
    }

    const laravelResponse = await fetch(
      "https://admin.questrealestate.ae/api/contact-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-API-Key": "T3SDUBKCS6tfWhyATbOuiBe5YYqR4sMr",
        },
        body: JSON.stringify({
          subject,
          first_name,
          last_name,
          email,
          notes,
        }),
      }
    );

    const data = await laravelResponse.json();

    if (!laravelResponse.ok) {
      return res.status(laravelResponse.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
