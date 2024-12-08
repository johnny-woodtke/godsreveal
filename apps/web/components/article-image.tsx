import Image from "next/image";

import { cn } from "@godsreveal/lib";

type ArticleImageProps = {
  src: string;
  alt: string;
  className?: string;
  caption?: React.ReactNode;
  captionClassName?: string;
};

export default function ArticleImage({
  src,
  alt,
  className,
  caption,
  captionClassName,
}: ArticleImageProps) {
  return (
    <div
      className={cn(
        "relative mx-auto my-12 w-full sm:w-[75%] lg:w-[50%]",
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
            "-mt-4 text-center text-sm text-muted-foreground",
            captionClassName,
          )}
        >
          {caption}
        </p>
      )}
    </div>
  );
}
