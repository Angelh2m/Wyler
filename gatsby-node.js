/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it


// data layer is bootstrapped to let plugins create pages from data.
const path = require('path');

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions

    return new Promise((resolve, reject) => {
        const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
        // Query for markdown nodes to use in creating pages.
        resolve(
            graphql(
                `
            {
                allArticlesJson{
                    edges{
                      node{
                        title
                      }
                    }
                }
            }
          `
            ).then(result => {
                if (result.errors) { reject(result.errors) }
                // Create pages for each markdown file.
                result.data.allArticlesJson.edges.forEach(({ node }) => {
                    const path = node.title
                    createPage({
                        path,
                        component: blogPostTemplate,
                        // In your blog post template's graphql query, you can use path
                        // as a GraphQL variable to query for data from the markdown file.
                        context: {
                            id: node.id,
                        },
                    })
                })
            })
        )
    })
}

exports.onCreatePage = ({ page, actions }) => {
    const { createPage } = actions
    // Make the front page match everything client side.
    // Normally your paths should be a bit more judicious.
    if (page.path === `/`) {
        page.matchPath = `/*`
        createPage(page)
    }
}
