import { cn } from "@godsreveal/lib";

type YoutubePlayerProps = {
  src: string;
  title: string;
  className?: string;
};

export default function YoutubePlayer({
  src,
  title,
  className,
}: YoutubePlayerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full lg:w-[75%]",
        "mb-12 mt-8 max-sm:mb-6 max-sm:mt-4",
        className,
      )}
    >
      <iframe
        className="aspect-video w-full"
        src={src}
        title={`Youtube video player: ${title}`}
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
