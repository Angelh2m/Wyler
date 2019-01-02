import React from 'react'
import Img from 'gatsby-image'


export default function Category(props) {
    const posts = props.data.allMarkdownRemark.edges;
    console.warn(posts);

    return (
        <div>
            <h3>Categories</h3>
            {posts.map((post, i) => (
                <div key={i}>
                    <h2> {post.node.frontmatter.title} </h2>
                    {
                        post.node.frontmatter.featuredImage && (
                            <Img fixed={post.node.frontmatter.featuredImage.childImageSharp.fixed} />
                        )
                    }
                    <p>
                        {post.node.excerpt}
                    </p>
                </div>


            ))}
        </div>
    )
}

export const pageQuery = graphql`
            
  query($id: String!) {
                allMarkdownRemark(filter: {frontmatter: {category: {eq: $id} } } ) {
                edges {
            node {
                frontmatter{
            title
            category
                  featuredImage {
                childImageSharp{
                    fixed(width: 400) {
                        # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
                        ...GatsbyImageSharpFixed
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