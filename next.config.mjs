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
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT,
    EMAIL_USERNAME: process.env.EMAIL_USERNAME,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    PAIT_ADDRESS: process.env.PAIT_ADDRESS,
  },
};

export default nextConfig;
