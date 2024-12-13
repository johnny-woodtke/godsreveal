"use client";

import { ShuffleIcon } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

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
import { STUDY_URL_PARAM, Study } from "@/lib/constants/url-params";
import { HEADER_STUDY_MAP, Header } from "@/lib/constants/url-params";

/**
 * Clicking this button will randomly select a study and redirect to it.
 */
export default function Remix() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const { getUrl } = usePushUrl();

  async function handleClick() {
    try {
      setLoading(true);
      const { header, study } = getRandomStudy();

      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(STUDY_URL_PARAM, study);

      await new Promise((resolve) =>
        setTimeout(resolve, getRandomTimeout(2000, 5000)),
      );

      router.push(
        getUrl({
          includeHost: false,
          searchParams: newSearchParams,
          urlFragment: header,
        }),
      );
      setOpen(false);
    } catch {
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Image
          src="/favicon-192x192.png"
          alt="God's Reveal"
          width={100}
          height={100}
          className={cn(
            "size-9 cursor-pointer rounded-md",
            "transition-all duration-300 hover:animate-pulse",
            "shadow-[0_0_15px_rgba(59,130,246,0.5)]",
            "dark:shadow-[0_0_15px_rgba(96,165,250,0.5)]",
            "hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]",
            "dark:hover:shadow-[0_0_25px_rgba(96,165,250,0.6)]",
          )}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reveal</DialogTitle>
          <div className="relative my-6 flex min-h-[120px] items-center justify-center overflow-hidden rounded-lg border bg-muted/50 p-6">
            <div className="flex flex-col items-center gap-4 text-center">
              {!loading ? (
                <>
                  <Button
                    className="size-14 rounded-full border-2 border-primary/50 bg-primary/10 p-3"
                    onClick={handleClick}
                  >
                    <ShuffleIcon className="text-primary" />
                  </Button>

                  <p className="text-sm text-muted-foreground">
                    Click the shuffle button to reveal a random study that God
                    has prepared for you.
                  </p>
                </>
              ) : (
                <div className="relative mb-14 p-1">
                  <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                  <div className="relative size-12 animate-pulse rounded-full border-4 border-primary bg-background" />
                </div>
              )}
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
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
