import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import FrontPageLayout from '../layouts/FrontPageLayout'

export default function FrontPageES() {
  return (
    <div>
      <StaticQuery
        query={graphql`
          query getAllpostsInSpanish {
            allMarkdownRemark(
              filter: { frontmatter: { language: { eq: "ES" } } }
              sort: { fields: [frontmatter___date], order: DESC }
            ) {
              edges {
                node {
                  frontmatter {
                    title
                    category
                    slug
                    date
                    language

                    featuredImage {
                      childImageSharp {
                        fluid(maxWidth: 700) {
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
            {data && <FrontPageLayout data={data} language="es" />}
          </>
        )}
      />
    </div>
  )
}
