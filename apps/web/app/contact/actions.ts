"use server";

import type { ContactFormData } from "@/components/contact/schema";
import { generateContactFormEmail } from "@/lib/emails/contact-form-template";
import {
  type MailjetPayload,
  sendMailjetEmail,
} from "@/lib/emails/mailjet-client";

export async function sendContactFormEmail({
  name,
  email,
  phone,
  message,
}: ContactFormData) {
  // Get environment variables
  const botEmail = process.env.CONTACT_FORM_BOT_EMAIL;
  const targetEmail = process.env.CONTACT_FORM_TARGET_EMAIL;

  // Check if all required environment variables are set
  if (!botEmail || !targetEmail) {
    console.error("Missing required environment variables for email sending");
    throw new Error("Email configuration error");
  }

  // Generate the HTML content for the email
  const htmlContent = generateContactFormEmail({ name, email, phone, message });

  // Prepare the payload for Mailjet API
  const emailPayload: MailjetPayload = {
    Messages: [
      {
        From: {
          Email: botEmail,
          Name: "Contact Form",
        },
        To: [
          {
            Email: targetEmail,
            Name: "Admin",
          },
        ],
        Subject: `New Contact Form Submission from ${name}`,
        HTMLPart: htmlContent,
      },
    ],
  };

  try {
    // Send the email using our Mailjet client
    const result = await sendMailjetEmail(emailPayload);

    if (!result.success) {
      console.error("Failed to send email:", result.error);
      throw new Error("Failed to send email");
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}
