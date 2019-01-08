import React from 'react'
import { Link } from 'gatsby'
import SEO from '../components/seo'
import Img from 'gatsby-image'
import Sidebar from '../components/Sidebar/Sidebar';
import Layout from '../components/layout';

import './Category.scss';

export default function Category(props) {
  const posts = props.data.allMarkdownRemark.edges
  console.warn(posts)
  console.log(props);

  // try { window.scrollTo(0, 0) } catch (error) { console.log(err)}
  return (
    <Layout>
      <SEO
        title={props.pageContext.id}
        description={'Description'}
        keywords={[`gatsby`, `application`, `react`]}
      />

      <h2>Articles in: {props.pathContext.id}</h2>
      <div className="container--flex">
        <article className="container--flex posts">

          <div className="col-7" >
            {posts.map((post, i) => (
              <div key={i} className="layout__search">

                <div>

                  {post.node.frontmatter.featuredImage && (
                    <Link
                      to={`${post.node.frontmatter.category}/${
                        post.node.frontmatter.slug
                        }`}>
                      <Img
                        fluid={
                          post.node.frontmatter.featuredImage.childImageSharp.fluid
                        }
                      />
                    </Link>
                  )}
                </div>

                <div className="layout__one">

                  <Link
                    to={`${post.node.frontmatter.category}/${
                      post.node.frontmatter.slug
                      }`}>

                    <h2> {post.node.frontmatter.title} </h2>
                  </Link>

                  <p>{post.node.excerpt}</p>

                  <Link
                    to={`${post.node.frontmatter.category}/${
                      post.node.frontmatter.slug
                      }`}
                  >
                    <span className="button--read-more ">
                      READ MORE<i className="icon-arrow-right"></i></span>
                  </Link>
                </div>

              </div>

            ))}

          </div>
          <aside className="col-2-half">
            <Sidebar />
          </aside>
        </article>
      </div>


    </Layout>
  )
}

export const queryCategory = graphql`
  query($id: String!) {
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC   }
      filter: { frontmatter: { category: { eq: $id } } }
      ) {

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
