const { withStoreConfig } = require("./store-config")
const store = require("./store.config.json")

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = withStoreConfig({
    features: store.features,
    reactStrictMode: true,
    trailingSlash: true,
    images: {
        remotePatterns: [{
                protocol: "http",
                hostname: "localhost",
            },
            {
                protocol: "https",
                hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
            },
            {
                protocol: "https",
                hostname: "medusa-server-testing.s3.amazonaws.com",
            },
            {
                protocol: "https",
                hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
            },
            {
                protocol: "https",
                hostname: "cdn.icon-icons.com",
            },
            {
                protocol: "https",
                hostname: "cosmore-server.s3.ca-central-1.amazonaws.com",
            },
        ],
    },
    env: {
        // Explicitly convert feature flags to strings
        ...(store.features && Object.entries(store.features).reduce((acc, [key, value]) => {
          acc[`FEATURE_${key.toUpperCase()}_ENABLED`] = value ? 'true' : 'false';
          return acc;
        }, {}))
      },
      webpack: (config, { isServer }) => {
        config.resolve.symlinks = false;
        
        // Increase performance budget
        config.performance = {
          hints: false,
          maxEntrypointSize: 512000,
          maxAssetSize: 512000
        };
    
        return config;
      },
})

console.log("next.config.js", JSON.stringify(module.exports, null, 2))

module.exports = nextConfig