/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    STORCHA_EMAIL: process.env.STORCHA_EMAIL
  },
};

export default nextConfig;
