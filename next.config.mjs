/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xtsemdavncboeicgvrsz.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/image/**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_SECRET_SUPABASE_SERVICE_ROLE: process.env.NEXT_SECRET_SUPABASE_SERVICE_ROLE,
    NEXT_SECRET_SUPABASE_JWT: process.env.NEXT_SECRET_SUPABASE_JWT,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_SECRET_EMAIL: process.env.NEXT_SECRET_EMAIL,
    NEXT_SECRET_PASSWORD: process.env.NEXT_SECRET_PASSWORD,
    NEXT_SECRET_OPENAI_API_KEY: process.env.NEXT_SECRET_OPENAI_API_KEY,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_TWITTER_APP_KEY: process.env.NEXT_PUBLIC_TWITTER_APP_KEY,
    NEXT_SECRET_TWITTER_APP_SECRET: process.env.NEXT_SECRET_TWITTER_APP_SECRET,
    NEXT_PUBLIC_TWITTER_ACCESS_TOKEN: process.env.NEXT_PUBLIC_TWITTER_ACCESS_TOKEN,
    NEXT_SECRET_TWITTER_ACCESS_SECRET: process.env.NEXT_SECRET_TWITTER_ACCESS_SECRET,
    NEXT_PUBLIC_TWITTER_BEARER_TOKEN: process.env.NEXT_PUBLIC_TWITTER_BEARER_TOKEN,
    NEXT_SECRET_MIDTRANS_SERVER_KEY: process.env.NEXT_SECRET_MIDTRANS_SERVER_KEY,
    NEXT_SECRET_MIDTRANS_CLIENT_KEY: process.env.NEXT_SECRET_MIDTRANS_CLIENT_KEY,
    NEXT_PUBLIC_RUNNING_MODE: process.env.NEXT_PUBLIC_RUNNING_MODE,
  },
  async headers() {
    return [
      {
        // Matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ];
  },
};

module.exports = nextConfig;