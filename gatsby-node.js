/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it


// data layer is bootstrapped to let plugins create pages from data.
const path = require('path');

exports.createPages = async ({ graphql, actions }) => {


    return new Promise((resolve, reject) => {
        // Query for markdown nodes to use in creating pages.
        resolve(
            graphql(
                `
            {
                allMarkdownRemark{
                    edges {
                        node { 
                            frontmatter{category slug}
                            html
                        }
                    }
                }
            }
          `
            ).then(result => {
                if (result.errors) { reject(result.errors) }
                // Create pages for each markdown file.
                result.data.allMarkdownRemark.edges.forEach(({ node }) => {
                    actions.createPage({
                        path: `${node.frontmatter.category}/${node.frontmatter.slug}`,
                        component: path.resolve(`src/templates/BlogPost.js`),
                        context: {
                            id: node.frontmatter.slug
                        },
                    })
                })

                result.data.allMarkdownRemark.edges.forEach(({ node }) => {
                    actions.createPage({
                        path: `${node.frontmatter.category}`,
                        component: path.resolve(`src/templates/Category.js`),
                        context: {
                            id: node.frontmatter.category,
                        },
                    })
                })

            })

        )
    })
}


/* *
*  Match route for reach router
*/

// exports.onCreatePage = ({ page, actions }) => {
//     const { createPage } = actions
//     // Make the front page match everything client side.
//     // Normally your paths should be a bit more judicious.
//     if (page.path === `/`) {
//         page.matchPath = `/*`
//         createPage(page)
//     }
// }
