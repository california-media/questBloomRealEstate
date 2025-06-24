export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ status: false, message: "Method not allowed" });
  }

  try {
    // Extract form data from request
    const formData = req.body;

    // Prepare data for CRM API
    const leadData = new FormData();
    leadData.append("name", formData.name);
    leadData.append("email", formData.email);
    leadData.append("phonenumber", formData.phone);
    leadData.append("description", formData.enquiry);
    leadData.append("status", "14");
    leadData.append("source", "9");
    leadData.append("assigned", "129");

    // Send to CRM API
    const crmResponse = await fetch(
      "https://crm.questrealestate.ae/api/leads",
      {
        method: "POST",
        headers: {
          Authorization:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoid2ViX2FwaV9rZXkiLCJuYW1lIjoid2ViX2FwaV9rZXkiLCJBUElfVElNRSI6MTc1MDc0NTU1MH0.bArzQAQZrOua-U4TCe0W3PQvsUvBSDNt6QKHbS1FkpA",
        },
        body: leadData,
      }
    );

    const crmData = await crmResponse.json();

    if (!crmResponse.ok) {
      return res.status(crmResponse.status).json({
        status: false,
        message: crmData.message || "Failed to create lead in CRM",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Lead created successfully",
    });
  } catch (error) {
    console.error("Lead submission error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
}
