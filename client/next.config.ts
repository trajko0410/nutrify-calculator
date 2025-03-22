/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.clerk.com",
                port: "",
                pathname: "/**",
                search: "",
            },
        ],
    },
    experimental: {
        optimizeCss: false, // ✅ Optimize CSS delivery
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === "production", // ✅ Remove console logs in production
    },
    output: "standalone", // ✅ Optimize for smaller Docker/Serverless deployment
}

module.exports = nextConfig
