"use client";

import * as Sentry from "@sentry/nextjs";
import { LinkIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { cn } from "@godsreveal/lib";
import { useToast } from "@godsreveal/ui";

import { usePushUrl } from "@/components/use-push-url";
import { HeaderValues } from "@/lib/constants/url-params";

type ArticleHeaderProps = {
  id: HeaderValues;
  children: React.ReactNode;
  className?: string;
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export default function ArticleHeader({
  id,
  children,
  className,
  as = "h2",
}: ArticleHeaderProps) {
  const router = useRouter();
  const { getUrl, push } = usePushUrl();
  const { ref, inView } = useInView({
    rootMargin: "0% 0% -92% 0%",
  });

  useEffect(() => {
    // if header is in view, update the url to include the id as a fragment
    if (inView) {
      push({
        urlFragment: id || null,
      });
    }
  }, [inView]);

  const { toast } = useToast();

  async function copyUrl() {
    const urlWithHost = getUrl({
      urlFragment: id || null,
      includeHost: true,
    });
    navigator?.clipboard?.writeText(urlWithHost).catch((e) => {
      Sentry.captureException(e, {
        tags: {
          component: "ArticleHeader",
          action: "copyUrl",
        },
      });
    });
    toast({
      title: "Link copied",
      description:
        "The link to this section has been copied to your clipboard.",
    });
    router.push(getUrl({ urlFragment: id || null, includeHost: false }));
  }

  const HeaderTag = as;

  return (
    <HeaderTag
      id={id}
      ref={ref}
      className={cn(
        "group flex items-center gap-3",
        "cursor-pointer scroll-mt-[110px] sm:scroll-mt-[130px]",
        className,
      )}
      onClick={copyUrl}
    >
      {children}
      <LinkIcon className="size-5 opacity-0 transition-opacity group-hover:opacity-100" />
    </HeaderTag>
  );
}
