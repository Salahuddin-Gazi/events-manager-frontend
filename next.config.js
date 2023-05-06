/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "cloudinary",
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
