/** @type {import('next').NextConfig} */
const nextConfig = {
    serverRuntimeConfig: {
        key: "This string is used to sign and verify JWTs. Create your own using 'openssl rand -hex 32'"
    },
    reactStrictMode: true,
}

module.exports = nextConfig
