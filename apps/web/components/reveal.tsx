"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@godsreveal/lib";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@godsreveal/ui";

import { usePushUrl } from "@/components/use-push-url";
import { Study } from "@/lib/constants/url-params";
import { HEADER_STUDY_MAP, Header } from "@/lib/constants/url-params";

/**
 * Clicking this button will randomly select a study and redirect to it.
 */
export default function Reveal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { getUrl } = usePushUrl();

  async function handleClick() {
    try {
      setLoading(true);
      const { header, study } = getRandomStudy();

      await new Promise((resolve) =>
        setTimeout(
          resolve,
          getRandomTimeout(TIME_PER_MESSAGE, TIME_PER_MESSAGE * 3),
        ),
      );

      setOpen(false);

      router.push(
        getUrl({
          includeHost: false,
          pathname: `/${study}`,
          urlFragment: header,
        }),
      );
    } catch {
    } finally {
      setLoading(false);
    }
  }

  const [previousIndexes, setPreviousIndexes] = useState<Set<number> | null>(
    null,
  );
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!loading) {
      return;
    }

    function getNewLoadingMessage(previousIndexes: Set<number>) {
      // get initial message and new previous indexes
      const { message: initialMessage, previousIndexes: newPreviousIndexes } =
        getRandomLoadingText(previousIndexes);

      // set initial message and previous indexes
      setLoadingMessage(initialMessage);
      setPreviousIndexes(newPreviousIndexes);
    }

    getNewLoadingMessage(new Set());

    const interval = setInterval(() => {
      getNewLoadingMessage(previousIndexes ?? new Set());
    }, TIME_PER_MESSAGE);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <RemixImage width={50} height={50} className="size-9 rounded-md" />
      </DialogTrigger>
      <DialogContent className="max-sm:h-full max-sm:w-full max-sm:min-w-full">
        <DialogHeader>
          <DialogTitle className="text-center text-xl sm:text-2xl">
            God's Reveal
          </DialogTitle>
          <div className="relative my-6 flex min-h-[200px] items-center justify-center overflow-hidden rounded-lg border bg-muted/50 p-6">
            <div className="mt-6 flex h-full flex-col items-center gap-6 text-center">
              <Button
                className="relative size-14 rounded-full"
                onClick={handleClick}
                disabled={loading}
              >
                <RemixImage
                  className={cn(
                    "rounded-full object-contain",
                    loading && "animate-slow-pulse",
                  )}
                  fill
                />
              </Button>

              <p className="flex-1 text-sm text-muted-foreground">
                {loading
                  ? loadingMessage
                  : "Click the button to reveal a random study that God has prepared for you."}
              </p>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

type RemixImageProps = {
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
};

function RemixImage({ width, height, fill, className }: RemixImageProps) {
  return (
    <Image
      src="/favicon-192x192.png"
      alt="God's Reveal"
      width={width}
      height={height}
      className={cn(
        "transition-all duration-300 hover:animate-pulse",
        "shadow-[0_0_15px_rgba(59,130,246,0.5)]",
        "dark:shadow-[0_0_15px_rgba(96,165,250,0.5)]",
        "hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]",
        "dark:hover:shadow-[0_0_25px_rgba(96,165,250,0.6)]",
        className,
      )}
      fill={fill}
    />
  );
}

const remixOptions = Object.values(Header).filter(
  (header) => !!HEADER_STUDY_MAP[header],
);

function getRandomStudy(): {
  header: Header;
  study: Study;
} {
  const randomIndex = Math.floor(Math.random() * remixOptions.length);
  const header = remixOptions[randomIndex]!;
  const study = HEADER_STUDY_MAP[header]!;
  return { header, study };
}

function getRandomTimeout(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const TIME_PER_MESSAGE = 2500;

const LOADING_TEXT_OPTIONS = [
  "There is no chance. There is no luck. God is in control.",
  "Luck is a demonic word to describe good things that happen to us outside of our control. It fails to properly attribute God's sovereignty.",
  'God knows the result of every "random" thing that will ever happen to you. He knows the end from the beginning.',
  "Every revelation is a carefully chosen message from above.",
  "God's timing is perfect - this study was chosen specifically for you today.",
];

function getRandomLoadingText(previousIndexes: Set<number>) {
  const randomIndex = Math.floor(Math.random() * LOADING_TEXT_OPTIONS.length);
  if (previousIndexes.has(randomIndex)) {
    return getRandomLoadingText(previousIndexes);
  }

  const newPreviousIndexes = new Set(previousIndexes);
  newPreviousIndexes.add(randomIndex);

  return {
    message: LOADING_TEXT_OPTIONS[randomIndex]!,
    previousIndexes: newPreviousIndexes,
  };
}
