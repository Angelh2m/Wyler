import React from 'react'
import Layout from '../components/layout';

export default function BlogPost(props) {
    console.warn(props.pageContext);

    const post = props.pageContext;
    return (
        <Layout>
            <div>
                <h1>{post.frontmatter.title}</h1>
                <p dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>
        </Layout>
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
