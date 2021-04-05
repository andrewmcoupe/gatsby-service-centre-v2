module.exports = {
  siteMetadata: {
    title: 'gatsby-service-centre',
  },
  plugins: [
    'gatsby-plugin-gatsby-cloud',
    '@chakra-ui/gatsby-plugin',
    'gatsby-plugin-tsconfig-paths',
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/customer/*`, '/edit-customer/*'] },
    },
  ],
}
