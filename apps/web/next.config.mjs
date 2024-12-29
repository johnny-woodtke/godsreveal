import pwa from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_REVERSE_PROXY_URL}/:path*`,
      },
      {
        source: "/",
        destination: "/extra-biblical-studies",
      },
    ];
  },
};

const withPWA = pwa({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

export default withPWA(nextConfig);
