/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    VERIFF_API_KEY: process.env.VERIFF_API_KEY,
    VERIFF_API_SECRET: process.env.VERIFF_API_SECRET,
    WERT_PARTNER_ID: process.env.WERT_PARTNER_ID,
  },
};

export default nextConfig;
