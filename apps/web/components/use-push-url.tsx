"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useUrlFragment } from "@/components/use-url-fragment";

type PushProps = {
  pathname?: string;
  searchParams?: URLSearchParams | null;
  urlFragment?: string | null;
};

export function usePushUrl() {
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlFragment = useUrlFragment();

  function getUrl({
    pathname: inputtedPathname,
    searchParams: inputtedSearchParams,
    urlFragment: inputtedUrlFragment,
    includeHost,
  }: PushProps & {
    includeHost: boolean;
  }) {
    if (typeof window === "undefined" && includeHost) {
      throw new Error("Window is not defined");
    }

    let pathnameString = pathname;
    if (inputtedPathname) {
      pathnameString = inputtedPathname;
    }

    let searchParamsString = searchParams?.toString()?.trim();
    if (inputtedSearchParams) {
      searchParamsString = inputtedSearchParams.toString().trim();
    } else if (inputtedSearchParams === null) {
      searchParamsString = "";
    }

    let urlFragmentString = urlFragment;
    if (inputtedUrlFragment) {
      urlFragmentString = inputtedUrlFragment;
    } else if (inputtedUrlFragment === null) {
      urlFragmentString = "";
    }

    return `${includeHost ? window.location.origin : ""}${pathnameString}${
      searchParamsString ? `?${searchParamsString}` : ""
    }${urlFragmentString ? `#${urlFragmentString}` : ""}`;
  }

  function push({ pathname, searchParams, urlFragment }: PushProps) {
    router.push(
      getUrl({ pathname, searchParams, urlFragment, includeHost: false }),
    );
  }

  return { push, getUrl };
}
