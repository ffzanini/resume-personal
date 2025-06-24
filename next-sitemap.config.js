/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://resume.ffzanini.dev",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "monthly",
  priority: 0.7,
  exclude: [],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
  additionalPaths: async (config) => {
    return [await config.transform(config, "/")];
  },
};

module.exports = config;
