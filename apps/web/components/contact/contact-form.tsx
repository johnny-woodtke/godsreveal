"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as Sentry from "@sentry/nextjs";
import { useForm } from "react-hook-form";

import { Button, Card, useToast } from "@godsreveal/ui";

import { sendContactFormEmail } from "@/app/contact/actions";
import { FormField } from "@/components/contact/form-field";
import {
  ContactFormData,
  contactFormSchema,
} from "@/components/contact/schema";

export function ContactForm() {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });
  const { toast } = useToast();

  const onSubmit = async (data: ContactFormData) => {
    try {
      await sendContactFormEmail(data);
      toast({
        title: "Success",
        description: "Contact form submitted successfully!",
      });
      form.reset();
    } catch (error) {
      Sentry.captureException(error, {
        tags: {
          component: "ContactForm",
          action: "sendContactFormEmail",
        },
        extra: {
          email: data.email,
          formData: data,
        },
      });
      toast({
        title: "Error",
        description: "Failed to submit contact form. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Contact</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          id="name"
          label="Name"
          register={form.register}
          error={form.formState.errors.name?.message}
        />

        <FormField
          id="phone"
          label="Phone"
          type="tel"
          register={form.register}
          error={form.formState.errors.phone?.message}
        />

        <FormField
          id="email"
          label="Email"
          type="email"
          register={form.register}
          error={form.formState.errors.email?.message}
        />

        <FormField
          id="message"
          label="Message"
          register={form.register}
          error={form.formState.errors.message?.message}
          isTextarea
        />

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Card>
  );
}
