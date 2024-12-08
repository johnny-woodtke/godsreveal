"use client";

/**
 * Returns the current URL fragment.
 *
 * If the URL is http://www.godsreveal.com/#welcome, the fragment is "welcome".
 */
export function useUrlFragment() {
  if (typeof window === "undefined") {
    return null;
  }
  return window.location.hash.slice(1);
}
