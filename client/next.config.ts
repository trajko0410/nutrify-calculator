/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                port: "",
                pathname: "/**",
                search: "",
            },
        ],
    },
    experimental: {
        optimizeCss: false,
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
    output: "standalone",
}

module.exports = nextConfig
