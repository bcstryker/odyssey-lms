import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["odyssey-lms-digital-assets.s3.amazonaws.com"],
  },
};

export default nextConfig;
