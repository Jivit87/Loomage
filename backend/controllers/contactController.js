import Contact from "../models/Contact.js";
import sendContactEmails from "../services/emailService.js";

export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    });
    const savedContact = await newContact.save();

    await sendContactEmails({
      name,
      email,
      subject,
      message,
      contactId: savedContact._id,
    });

    res.status(201).json({
      success: true,
      message:
        "Contact form submitted successfully. We will get back to you soon!",
      contactId: savedContact._id,
    });
  } catch (error) {
    console.error("Contact form submission error:", error);

    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};