module.exports = {
  siteMetadata: {
    title: 'gatsby-service-centre',
  },
  plugins: [
    'gatsby-plugin-gatsby-cloud',
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
  ],
}
