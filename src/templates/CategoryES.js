import React from 'react'
import SEO from '../components/seo'
import Layout from '../layouts/layout'

import './Category.scss'
import CategoryLayout from '../layouts/CategoryLayout';

export default function Category(props) {
    const posts = props.data.allMarkdownRemark.edges
    // try { window.scrollTo(0, 0) } catch (error) { console.log(err)}
    return (
        <Layout>
            <SEO
                title={props.pageContext.id}
                description={'Description'}
                keywords={[`gatsby`, `application`, `react`]}
            />

            <h2>Articles in: {props.pageContext.id}</h2>
            <div>
                <CategoryLayout posts={posts} language={"es"} />
            </div>
        </Layout>
    )
}

export const queryCategory = graphql`
  query($id: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: $id } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            category
            slug
            language

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
