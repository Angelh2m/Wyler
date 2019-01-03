import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Img from 'gatsby-image'
// import './BlogPost.scss'
import { Link } from 'gatsby'
import { dateFormat } from '../util/dateFormat'

export default function BlogPost(props) {
  console.log(props)
  console.log(props.data)

  const post = props.data.allMarkdownRemark.edges[0].node

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.title}
        keywords={[`${post.frontmatter.title}`]}
      />

      <article className="container--block ">
        <div className="posts__meta">
          <div className="text__date">
            <Link
              to={`${post.frontmatter.category}`}
              className="text__category"
            >
              {post.frontmatter.category}
            </Link>
            <span>{dateFormat(post.frontmatter.date)}</span>
          </div>
        </div>

        <h1>{post.frontmatter.title}</h1>
        {
          post.frontmatter.featuredImage && (
            <Img fluid={post.frontmatter.featuredImage.childImageSharp.fluid} />
          )
        }
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </Layout>
  )
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

            featuredImage {
              childImageSharp {
                fluid(maxWidth: 900) {
                  # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          html
        }
      }
    }
  }
`
