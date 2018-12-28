/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// exports.onCreatePage = async ({ page, actions }) => {
//     const { createPage } = actions

//     // page.matchPath is a special key that's used for matching pages
//     // only on the client.
//     if (page.path.match(/^\/app/)) {
//         page.matchPath = `/app/*`

//         // Update the page.
//         createPage(page)
//     }
// }



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
                if (result.errors) {
                    reject(result.errors)
                }
                console.log(result);
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