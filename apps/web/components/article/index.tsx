import { cn } from "@godsreveal/lib";

type ArticleProps = {
  className?: string;
  children: React.ReactNode;
};

export default function Article({ className, children }: ArticleProps) {
  return (
    <article
      className={cn(
        "prose w-full min-w-full dark:prose-invert max-sm:prose-sm",
        className,
      )}
    >
      {children}
    </article>
  );
}
