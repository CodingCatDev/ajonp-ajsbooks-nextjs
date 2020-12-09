const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");

const nextConfig = {
  analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: "static",
      reportFilename: "../bundles/server.html",
    },
    browser: {
      analyzerMode: "static",
      reportFilename: "../bundles/client.html",
    },
  },
  webpack(config) {
    return config;
  },
};

const prodConfig = {
  API_ENDPOINT: "https://us-central1-ajonp-ajs-books.cloudfunctions.net/api/",
};

const devConfig = {
  API_ENDPOINT: "https://us-central1-ajonp-ajs-books.cloudfunctions.net/api/",
};

(module.exports = {
  target: "serverless",
  env: process.env.NODE_ENV === "production" ? prodConfig : devConfig,
}),
  withBundleAnalyzer(nextConfig);
