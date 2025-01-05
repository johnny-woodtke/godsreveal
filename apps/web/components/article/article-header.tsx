"use client";

import { LinkIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { cn } from "@godsreveal/lib";

import { usePushUrl } from "@/components/use-push-url";
import { Header } from "@/lib/constants/url-params";

type ArticleHeaderProps = {
  id: Header;
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

  async function copyUrl() {
    await navigator.clipboard.writeText(
      getUrl({
        urlFragment: id || null,
        includeHost: true,
      }),
    );
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
