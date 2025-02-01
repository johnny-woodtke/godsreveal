import { Metadata } from "next";

import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="container max-w-2xl py-8">
      <ContactForm />
    </div>
  );
}
