"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { useUrlFragment } from "@/components/use-url-fragment";

type PushProps = {
  pathname?: string;
  searchParams?: URLSearchParams | null;
  urlFragment?: string | null;
};

export function usePushUrl() {
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
    window.history.replaceState(
      null,
      "",
      getUrl({ pathname, searchParams, urlFragment, includeHost: true }),
    );
  }

  return { push, getUrl };
}
