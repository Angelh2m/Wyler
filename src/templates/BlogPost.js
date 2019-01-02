import React from 'react'
import Layout from '../components/layout'

export default function BlogPost(props) {
  // console.warn(props)
  const post = props.data.markdownRemark

  console.log(post)

  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </Layout>
  )
}

export const articleQuery = graphql`
  query article {
    markdownRemark {
      frontmatter {
        title
        date
        _PARENT
      }
      id
      html
    }
  }
`
