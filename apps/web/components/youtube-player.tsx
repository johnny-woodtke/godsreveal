"use client";

import { PlayCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@godsreveal/ui";

type YoutubePlayerProps = {
  src: string;
  title: string;
  description?: string;
};

export default function YoutubePlayer({
  src,
  title,
  description,
}: YoutubePlayerProps) {
  const videoId = getYoutubeVideoId(src);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(
    videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null,
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="h-full cursor-pointer transition-colors hover:bg-accent">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video w-full overflow-hidden">
              {thumbnailUrl ? (
                <Image
                  src={thumbnailUrl}
                  alt={title}
                  fill
                  sizes="100vw"
                  style={{
                    margin: "0px 0px",
                  }}
                  className="object-cover"
                  onError={() => {
                    setThumbnailUrl(null);
                  }}
                />
              ) : (
                <ImageFallback />
              )}
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-screen-xl p-8 sm:p-10">
        <iframe
          className="aspect-video w-full"
          src={src}
          title={`Youtube video player (fullscreen): ${title}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </DialogContent>
    </Dialog>
  );
}

function getYoutubeVideoId(url: string) {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/,
  );
  return match ? match[1] : null;
}

function ImageFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
      <PlayCircle
        className="h-16 w-16 text-muted-foreground/50"
        strokeWidth={1.5}
      />
    </div>
  );
}

type YoutubePlayerGridProps = {
  children: React.ReactNode;
};

export function YoutubePlayerGrid({ children }: YoutubePlayerGridProps) {
  return <div className="grid gap-4 md:grid-cols-2 md:gap-2">{children}</div>;
}
