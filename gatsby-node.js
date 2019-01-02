/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it


// data layer is bootstrapped to let plugins create pages from data.
const path = require('path');
// require('es6-promise').polyfill();
// require('isomorphic-fetch');

/* *
*  BLOGPOST - Create single post pages URL's
*/
// exports.createPages = async ({ actions, graphql }) => {
//     const { data } = await graphql(`
//         {
//             allMarkdownRemark{
//                 edges {
//                     node { 
//                         frontmatter{title category}
//                         html
//                     }
//                 }
//             }
//         }
//     `);

//     data.allMarkdownRemark.edges.forEach(({ node }) => {

//         // console.log("DATA", `${node.frontmatter.category}/${node.frontmatter.title}`);
//         actions.createPage({
//             path: `${node.frontmatter.category}/${node.frontmatter.title}`,
//             component: path.resolve(`src/templates/BlogPost.js`),
//             context: {
//                 ...node
//             },
//         })
//     })
// }


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
                            frontmatter{title category}
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

                    // console.log("DATA", `${node.frontmatter.category}/${node.frontmatter.title}`);
                    actions.createPage({
                        path: `${node.frontmatter.category}/${node.frontmatter.title}`,
                        component: path.resolve(`src/templates/BlogPost.js`),
                        context: {
                            ...node
                        },
                    })
                })
            }).then(async () => {

                console.log("RUNNNNNNNNNNNNNNNNNNN .................. ");

                const { data } = await graphql(`
                    {
                            allMarkdownRemark{
                                edges {
                                    node { 
                                        frontmatter{title category}
                                    }
                                }
                            }
                        }
                    `)

                data.allMarkdownRemark.edges.forEach(({ node }) => {
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
*   Grab data from local JSON FILEs
*/

// exports.createPages = async ({ actions, graphql }) => {


// data.allInternalPosts.edges.forEach(({ node }) => {
//     if (node.slug) {
//         actions.createPage({
//             path: node.slug,
//             component: path.resolve(`src/templates/Category.js`),
//             context: {
//                 title: node.slug,
//             },
//         })
//     }
// })
// }

/* *
*  CATEGORY create pages
*/

// exports.createPages = async ({ actions, graphql }) => {
//     console.log("RUNNNNNNNNNNNNNNNNNNN .................. ");

//     const { data } = await graphql(`
//        {
//             allMarkdownRemark{
//                 edges {
//                     node { 
//                         frontmatter{title category}
//                     }
//                 }
//             }
//         }
//     `)

//     data.allMarkdownRemark.edges.forEach(({ node }) => {
//         actions.createPage({
//             path: `${node.frontmatter.category}`,
//             component: path.resolve(`src/templates/Category.js`),
//             context: {
//                 title: node.frontmatter.title,
//             },
//         })

//     })
// }



/* *
*   Grab data from an external source **
*/

// const { createFilePath } = require(`gatsby-source-filesystem`)

// exports.onCreateNode = ({ node, actions, getNode }) => {
//     const { createNodeField } = actions

//     if (node.internal.type === `MarkdownRemark`) {

//         const value = createFilePath({ node, getNode })

//         createNodeField({
//             name: `slug`,
//             component: path.resolve(`src/templates/posts.js`),
//             node,
//             value,
//         })
//     }
// }


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
