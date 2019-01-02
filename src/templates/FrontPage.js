import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Link } from '@reach/router'

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
            {/* <h3>{data.site.siteMetadata.title}</h3> */}
            {data.allMarkdownRemark.edges.map((post, i) => (
              <div key={i}>
                <Link
                  to={`${post.node.frontmatter.category}/${
                    post.node.frontmatter.title
                  }`}
                >
                  <h2>{post.node.frontmatter.title}</h2>
                </Link>

                <p dangerouslySetInnerHTML={{ __html: post.node.html }} />
              </div>
            ))}
            <div />
          </>
        )}
      />
    </div>
  )
}
