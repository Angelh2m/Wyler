import React, { Component } from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Img from 'gatsby-image'
// import './BlogPost.scss'
import { Link } from 'gatsby'
import { dateFormat } from '../util/dateFormat'
import Comments from '../components/Comments/Comments';
import './BlogPost.scss'

export default class BlogPost extends Component {

  componentDidMount() {
    try {
      window.scrollTo(0, 0)
    } catch (error) { }
  }

  render() {
    const post = this.props.data.allMarkdownRemark.edges[0].node
    return (
      <Layout>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.title}
          images={post.frontmatter.featuredImage}
          keywords={[`${post.frontmatter.title}`]}
          postURL={`${post.frontmatter.category}/${post.frontmatter.slug}`}
          postDate={post.frontmatter.date}
          type="Blog"
        />

        <article className="container--block " role="main">
          <div className="posts__meta">
            <div className="text__date">
              <Link
                to={`${post.frontmatter.category}`}
                className="text__category"
              >
                {post.frontmatter.category}
              </Link>
              <time dateTime={dateFormat(post.frontmatter.date)} >{dateFormat(post.frontmatter.date)}</time>
            </div>
          </div>

          <h1>{post.frontmatter.title}</h1>
          {
            post.frontmatter.featuredImage && (
              <Img alt={post.frontmatter.title} fluid={post.frontmatter.featuredImage.childImageSharp.fluid} />
            )
          }
          <div
            key={`body`}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <Comments />

        </article>
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
                fluid(maxWidth: 900 ) {
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
