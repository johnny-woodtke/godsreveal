/** @type {import('next').NextConfig} */
export default {
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_REVERSE_PROXY_URL}/:path*`,
      },
    ];
  },
};
