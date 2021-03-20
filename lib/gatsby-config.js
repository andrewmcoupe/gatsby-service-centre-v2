"use strict";
module.exports = {
    siteMetadata: {
        title: 'gatsby-service-centre',
    },
    plugins: [
        'gatsby-plugin-gatsby-cloud',
        {
            resolve: `gatsby-plugin-typescript`,
            options: {
                isTSX: true,
                jsxPragma: `jsx`,
                allExtensions: true,
            },
        },
    ],
};
//# sourceMappingURL=gatsby-config.js.map