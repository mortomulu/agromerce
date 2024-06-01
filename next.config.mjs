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
};

export default nextConfig;
