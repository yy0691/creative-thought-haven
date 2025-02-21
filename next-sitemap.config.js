/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://your-domain.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://your-domain.com/server-sitemap.xml',
    ],
  },
  exclude: ['/404'],
};