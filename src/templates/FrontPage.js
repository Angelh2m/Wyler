import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Link } from '@reach/router'
import Img from 'gatsby-image'
import SocialMedia from '../components/SocialMedia/SocialMedia'
// import './FrontPage.scss'

export default function FrontPage() {
  return (
    <div>
      <StaticQuery
        query={graphql`
          query getAllposts {
            allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC   }  ) {
              edges {
                node {
                  frontmatter {
                    title
                    category
                    slug
                    date

                    featuredImage {
                      childImageSharp {
                        fluid(maxWidth: 800 , toFormat: WEBP ) {
                          # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
                          ...GatsbyImageSharpFluid
                        }
                      }
                    }

                  }

                  html
                  excerpt
                }
              }
            }
          }
        `}
        render={data => (
          <>
            {data.allMarkdownRemark.edges.map((post, i) => (
              <div key={i} className="container--flex front__spacer">
                <div className="col-1 posts__social-column">
                  <SocialMedia post={post.node.frontmatter} />
                </div>

                <div className="col-7 ">
                  <Link
                    to={`${post.node.frontmatter.category}/${
                      post.node.frontmatter.slug
                      }`}
                  >
                    <h2>{post.node.frontmatter.title}</h2>
                  </Link>
                  {post.node.frontmatter.featuredImage && (
                    <Link
                      to={`${post.node.frontmatter.category}/${
                        post.node.frontmatter.slug
                        }`}
                    >
                      <Img
                        fluid={
                          post.node.frontmatter.featuredImage.childImageSharp
                            .fluid
                        }
                      />
                    </Link>
                  )}
                  <div
                    key={`body`}
                    id="___gatsby"
                    dangerouslySetInnerHTML={{ __html: post.node.excerpt }}
                  />

                  <Link
                    to={`${post.node.frontmatter.category}/${
                      post.node.frontmatter.slug
                      }`}
                  >

                    <span className="button--read-more ">
                      READ MORE<i class="icon-arrow-right"></i></span>
                  </Link>
                </div>
              </div>
            ))}
            <div />
          </>
        )}
      />
    </div>
  )
}
