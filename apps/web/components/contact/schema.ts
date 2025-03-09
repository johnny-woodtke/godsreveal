import { z } from "zod";

export const contactFormSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z
      .string()
      .refine((value) => value === "" || /^\d{10}$/.test(value), {
        message: "Please enter a valid phone number",
      }),
    email: z
      .string()
      .refine(
        (value) => value === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        {
          message: "Please enter a valid email address",
        },
      ),
    message: z.string().min(10, "Message must be at least 10 characters"),
  })
  .refine((data) => data.phone || data.email, {
    message: "Either phone or email must be provided",
    path: ["phone", "email"],
  });

export type ContactFormData = z.infer<typeof contactFormSchema>;
