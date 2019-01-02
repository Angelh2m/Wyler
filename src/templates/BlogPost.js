
import React from 'react'

export default function BlogPost(props) {
    console.warn(props.pageContext);

    const post = props.pageContext;
    return (
        <div>
            <div>
                <h1>{post.frontmatter.title}</h1>
                <p dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>
        </div>
    )
}


// export const articleQuery = graphql`
//   query articles {
//     markdownRemark {
//       frontmatter {
//         title
//         date
//         _PARENT
//       }
//       id
//       html
//     }
//   }
// `
