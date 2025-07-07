export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    const { subject = "New Property Enquiry", lead } = req.body;

    // Validate required fields
    if (!lead || !lead.name || !lead.email || !lead.description) {
      return res.status(422).json({
        success: false,
        errors: {
          subject: !subject ? ["The subject field is required."] : null,
          "lead.name": !lead?.name
            ? ["The lead.name field is required."]
            : null,
          "lead.email": !lead?.email
            ? ["The lead.email field is required."]
            : null,
          "lead.description": !lead?.description
            ? ["The lead.description field is required."]
            : null,
        },
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(lead.email)) {
      return res.status(422).json({
        success: false,
        errors: {
          "lead.email": ["The lead.email must be a valid email address."],
        },
      });
    }

    const laravelResponse = await fetch(
      "https://admin.questrealestate.ae/api/crm-leads-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-API-Key": "T3SDUBKCS6tfWhyATbOuiBe5YYqR4sMr", // Your Laravel API key
        },
        body: JSON.stringify({
          subject,
          lead: {
            name: lead.name,
            email: lead.email,
            phonenumber: lead.phonenumber || null,
            description: lead.description,
          },
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
