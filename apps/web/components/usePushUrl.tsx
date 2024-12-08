"use client";

import { useRouter } from "next/navigation";

type PushProps = {
  pathname: string;
  searchParams: URLSearchParams | null;
  urlFragment: string | null;
};

export function usePushUrl() {
  const router = useRouter();

  function getUrl({
    pathname,
    searchParams,
    urlFragment,
    includeHost,
  }: PushProps & {
    includeHost: boolean;
  }) {
    const paramsString = searchParams?.toString()?.trim();
    return `${includeHost ? window.location.origin : ""}${pathname}${
      paramsString ? `?${paramsString}` : ""
    }${urlFragment ? `#${urlFragment}` : ""}`;
  }

  function push({ pathname, searchParams, urlFragment }: PushProps) {
    router.push(
      getUrl({ pathname, searchParams, urlFragment, includeHost: false }),
    );
  }

  return { push, getUrl };
}
