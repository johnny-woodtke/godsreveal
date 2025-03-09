import type { ContactFormData } from "@/components/contact/schema";

import { contactFormEmailStyles } from "./contact-form-styles";

/**
 * Generates the HTML structure for the contact form email
 *
 * @param content The HTML content to insert into the email body
 * @returns Complete HTML email structure
 */
function createEmailStructure(content: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        ${contactFormEmailStyles}
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Contact Form Submission</h2>
        </div>
        ${content}
      </div>
    </body>
    </html>
  `;
}

/**
 * Generates the content section of the contact form email
 *
 * @param data Contact form data
 * @returns HTML string for the email content
 */
function createEmailContent(data: ContactFormData): string {
  const { name, email, phone, message } = data;

  return `
    <div class="content">
      <div class="field">
        <span class="field-name">Name:</span> ${name}
      </div>
      <div class="field">
        <span class="field-name">Email:</span> ${email || "Not provided"}
      </div>
      <div class="field">
        <span class="field-name">Phone:</span> ${phone || "Not provided"}
      </div>
      <div class="message-section">
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      </div>
    </div>
    <div class="footer">
      <p>This message was sent from <a href="${process.env.NEXT_PUBLIC_URL}/contact">${process.env.NEXT_PUBLIC_URL}/contact</a> on ${new Date().toLocaleString()}</p>
    </div>
  `;
}

/**
 * Generates complete HTML email content for contact form submissions
 *
 * @param data Contact form data including name, email, phone, and message
 * @returns HTML string for the email
 */
export function generateContactFormEmail(data: ContactFormData): string {
  const content = createEmailContent(data);
  return createEmailStructure(content);
}
