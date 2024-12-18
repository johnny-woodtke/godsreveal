import { LightbulbIcon } from "lucide-react";

import { cn } from "@godsreveal/lib";

type CalloutProps = {
  Icon?: React.ReactNode;
  text: React.ReactNode;
  className?: string;
};

export default function Callout({ Icon, text, className }: CalloutProps) {
  return (
    <div
      className={cn(
        "flex w-full items-center gap-4",
        "my-10 rounded-lg bg-muted py-1 pl-4 pr-6",
        className,
      )}
    >
      {Icon || (
        <LightbulbIcon className="size-5 shrink-0 text-primary sm:size-6" />
      )}
      <p className="text-primary">{text}</p>
    </div>
  );
}
