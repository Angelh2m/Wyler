import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Link } from '@reach/router'
import Img from 'gatsby-image'

export default function FrontPage() {
  return (
    <div>
      <h2>FRONT PAGE</h2>
      <StaticQuery
        query={graphql`
          query getAllposts {
            allMarkdownRemark {
              edges {
                node {
                  frontmatter {
                    title
                    category
                    slug
                    featuredImage {
                      childImageSharp {
                        fixed(width: 400) {
                          ...GatsbyImageSharpFixed
                        }
                      }
                    }
                  }
                  html
                }
              }
            }
          }
        `}
        render={data => (
          <>
            {console.log(data.allMarkdownRemark.edges)}

            {data.allMarkdownRemark.edges.map((post, i) => (
              <div key={i}>
                <Link
                  to={`${post.node.frontmatter.category}/${
                    post.node.frontmatter.slug
                  }`}
                >
                  <h2>{post.node.frontmatter.title}</h2>
                </Link>
                {post.node.frontmatter.featuredImage && (
                  <Img
                    fixed={
                      post.node.frontmatter.featuredImage.childImageSharp.fixed
                    }
                  />
                )}
              </div>
            ))}
            <div />
          </>
        )}
      />
    </div>
  )
}
