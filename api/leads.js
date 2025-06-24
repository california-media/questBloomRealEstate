export default async function handler(request, response) {
  // Only allow POST requests
  if (request.method !== "POST") {
    return response.status(405).json({
      status: false,
      message: "Method not allowed. Only POST requests are accepted.",
    });
  }

  try {
    // Parse JSON body
    const {
      name,
      email,
      phonenumber,
      description,
      status = "14",
      source = "9",
      assigned = "129",
    } = request.body;

    // Validate required fields
    if (!name?.trim()) {
      return response.status(400).json({
        status: false,
        message: "Name is required",
      });
    }

    if (!email?.trim()) {
      return response.status(400).json({
        status: false,
        message: "Email is required",
      });
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email.trim())) {
      return response.status(400).json({
        status: false,
        message: "Please enter a valid email address",
      });
    }

    if (!phonenumber?.trim()) {
      return response.status(400).json({
        status: false,
        message: "Phone number is required",
      });
    }

    if (!description?.trim()) {
      return response.status(400).json({
        status: false,
        message: "Enquiry text is required",
      });
    }

    // Create FormData to send to CRM API
    const leadData = new FormData();
    leadData.append("name", name.trim());
    leadData.append("email", email.trim());
    leadData.append("phonenumber", phonenumber.trim());
    leadData.append("description", description.trim());
    leadData.append("status", status);
    leadData.append("source", source);
    leadData.append("assigned", assigned);

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
      console.error("CRM API Error:", crmData);
      return response.status(crmResponse.status).json({
        status: false,
        message: crmData.message || "Failed to create lead in CRM",
      });
    }

    return response.status(200).json({
      status: true,
      message: "Lead created successfully",
      data: crmData,
    });
  } catch (error) {
    console.error("API Route Error:", error);
    return response.status(500).json({
      status: false,
      message:
        "An error occurred while processing your request. Please try again later.",
    });
  }
}
