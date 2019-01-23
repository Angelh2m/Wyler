import React, { Component } from 'react'
import Layout from '../layouts/layout'
import SEO from '../components/seo'
import BlogPostLayout from '../layouts/BlogPostLayout'

export default class BlogPost extends Component {
  componentDidMount() {
    try {
      window.scrollTo(0, 0)
    } catch (error) {}
  }

  render() {
    const post = this.props.data.allMarkdownRemark.edges[0].node
    return (
      <Layout>
        <SEO
          title={post.frontmatter.title}
          category={post.frontmatter.category}
          description={post.frontmatter.title}
          images={post.frontmatter.featuredImage}
          keywords={[`${post.frontmatter.title}`]}
          postURL={`${post.frontmatter.category}/${post.frontmatter.slug}`}
          postDate={post.frontmatter.date}
          recipe={post.frontmatter.recipe}
          type={post.frontmatter.category}
        />
        <BlogPostLayout post={post} />
      </Layout>
    )
  }
}

export const articleQuery = graphql`
  query($id: String!) {
    allMarkdownRemark(filter: { frontmatter: { slug: { eq: $id } } }) {
      edges {
        node {
          frontmatter {
            title
            category
            date
            slug

            featuredImage {
              childImageSharp {
                fluid(maxWidth: 900) {
                  # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
                  ...GatsbyImageSharpFluid
                }
              }
            }

            recipe {
              ingredients
              instructions
              cookTime
              totalTime
              recipeYield
              recipeCategory
              cookingMethod
              recipeCuisine
              keywords
              description
            }
          }
          html
        }
      }
    }
  }
`
