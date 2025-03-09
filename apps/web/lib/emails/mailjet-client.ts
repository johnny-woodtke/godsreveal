/**
 * Mailjet API client for sending emails
 */

export interface MailjetRecipient {
  Email: string;
  Name: string;
}

export interface MailjetSender {
  Email: string;
  Name: string;
}

export interface MailjetMessage {
  From: MailjetSender;
  To: MailjetRecipient[];
  Subject: string;
  HTMLPart: string;
  TextPart?: string;
}

export interface MailjetPayload {
  Messages: MailjetMessage[];
}

export interface SendEmailResult {
  success: boolean;
  error?: string;
  data?: any;
}

/**
 * Sends an email using the Mailjet API
 *
 * @param payload The email payload to send
 * @returns Result of the email sending operation
 */
export async function sendMailjetEmail(
  payload: MailjetPayload,
): Promise<SendEmailResult> {
  // Get environment variables
  const mailjetPublicKey = process.env.MJ_PUBLIC_KEY;
  const mailjetSecretKey = process.env.MJ_SECRET_KEY;

  // Check if required environment variables are set
  if (!mailjetPublicKey || !mailjetSecretKey) {
    console.error("Missing required Mailjet API keys");
    throw new Error("Email configuration error");
  }

  try {
    // Send the email using Mailjet API
    const response = await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${mailjetPublicKey}:${mailjetSecretKey}`,
        ).toString("base64")}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Mailjet API error:", errorData);
      return {
        success: false,
        error: "Failed to send email",
        data: errorData,
      };
    }

    const responseData = await response.json();
    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
