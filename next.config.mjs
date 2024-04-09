/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cards.scryfall.io']
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
      },
};

export default nextConfig;
