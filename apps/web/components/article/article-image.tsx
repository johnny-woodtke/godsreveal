import Image from "next/image";

import { cn } from "@godsreveal/lib";

type ArticleImageProps = {
  src: string;
  alt: string;
  className?: string;
  caption?: React.ReactNode;
  captionClassName?: string;
  large?: boolean;
};

export default function ArticleImage({
  src,
  alt,
  className,
  caption,
  captionClassName,
  large = false,
}: ArticleImageProps) {
  return (
    <div
      className={cn(
        "relative mx-auto my-12 w-full",
        !large && "sm:w-[75%] lg:w-[50%]",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-full"
        priority
      />
      {!!caption && (
        <p
          className={cn(
            "text-center text-sm text-muted-foreground",
            "-translate-y-3 sm:-translate-y-4",
            captionClassName,
          )}
        >
          {caption}
        </p>
      )}
    </div>
  );
}
