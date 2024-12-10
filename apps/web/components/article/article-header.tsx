"use client";

import { LinkIcon } from "lucide-react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { Button } from "@godsreveal/ui";

import { usePushUrl } from "@/components/use-push-url";

interface ArticleHeaderProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default function ArticleHeader({
  id,
  children,
  className,
  as = "h2",
}: ArticleHeaderProps) {
  const { getUrl } = usePushUrl();
  const { ref, inView } = useInView({
    rootMargin: "0% 0% -92% 0%",
  });

  useEffect(() => {
    // if header is in view, update the url to include the id as a fragment
    if (inView) {
      const url = getUrl({
        urlFragment: id || null,
        includeHost: true,
      });
      window.history.replaceState({}, "", url);
    }
  }, [inView]);

  function copyUrl() {
    const url = getUrl({
      urlFragment: id || null,
      includeHost: true,
    });
    navigator.clipboard.writeText(url);
  }

  const HeaderTag = as;

  return (
    <HeaderTag id={id} ref={ref} className={className}>
      <div className="group flex items-center gap-2">
        {children}
        <Button
          className="opacity-0 transition-opacity group-hover:opacity-100"
          onClick={copyUrl}
          variant="ghost"
          size="icon"
        >
          <LinkIcon />
        </Button>
      </div>
    </HeaderTag>
  );
}
