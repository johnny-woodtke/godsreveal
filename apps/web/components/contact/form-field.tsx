import { UseFormRegister } from "react-hook-form";

import { Input, Textarea } from "@godsreveal/ui";

import { ContactFormData } from "@/components/contact/schema";

interface FormFieldProps {
  id: keyof ContactFormData;
  label: string;
  register: UseFormRegister<ContactFormData>;
  error?: string;
  type?: string;
  isTextarea?: boolean;
}

export function FormField({
  id,
  label,
  register,
  error,
  type = "text",
  isTextarea = false,
}: FormFieldProps) {
  const Component = isTextarea ? Textarea : Input;
  const additionalProps = isTextarea
    ? { className: "min-h-[150px] w-full" }
    : { type, className: "w-full" };

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      <Component
        id={id}
        {...register(id)}
        {...additionalProps}
        aria-invalid={!!error}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
