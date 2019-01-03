import React from 'react'
import { Link } from 'gatsby'

import SEO from '../components/seo'
import Img from 'gatsby-image'
import Layout from '../components/Layout';

export default function Category(props) {
  const posts = props.data.allMarkdownRemark.edges
  console.warn(posts)

  return (
    <Layout>
      <SEO
        title={props.pageContext.id}
        description={'Description'}
        keywords={[`gatsby`, `application`, `react`]}
      />

      <div className="container--flex">
        <div className="container--flex posts">

          <div className="layout__search" />
          {posts.map((post, i) => (
            <div key={i}>
              <Link
                to={`${post.node.frontmatter.category}/${
                  post.node.frontmatter.slug
                  }`}
              >
                <h2> {post.node.frontmatter.title} </h2>
              </Link>
              {post.node.frontmatter.featuredImage && (
                <Img
                  fluid={
                    post.node.frontmatter.featuredImage.childImageSharp.fluid
                  }
                />
              )}
              <p>{post.node.excerpt}</p>
            </div>
          ))}
        </div>

      </div>
    </Layout>
  )
}

export const queryCategory = graphql`
  query($id: String!) {
    allMarkdownRemark(filter: { frontmatter: { category: { eq: $id } } }) {
      edges {
        node {

          frontmatter {
            title
            category
            slug

            featuredImage {
              childImageSharp {
                fluid(maxWidth: 800) {
                  # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
                  ...GatsbyImageSharpFluid
                }
              }
            }

          }
          html
          timeToRead
          excerpt
        }
      }
    }
  }
`
