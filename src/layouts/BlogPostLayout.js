import React from 'react'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import { dateFormat } from '../util/dateFormat'
import Comments from '../components/Comments/Comments'
import './BlogPost.scss'

export default function BlogPostLayout({ post, language }) {

    let url = language ? `es/` : "";

    return (
        <article className="container--block " role="main">
            <div className="posts__meta">
                <div className="text__date">
                    <Link to={`${url}${post.frontmatter.category}`} className="text__category">
                        {post.frontmatter.category}
                    </Link>
                    <time dateTime={dateFormat(post.frontmatter.date, url)}>
                        {dateFormat(post.frontmatter.date, url)}
                    </time>
                </div>
            </div>

            <h1>{post.frontmatter.title}</h1>
            {post.frontmatter.featuredImage && (
                <Img
                    alt={post.frontmatter.title}
                    fluid={post.frontmatter.featuredImage.childImageSharp.fluid}
                />
            )}
            <div key={`body`} dangerouslySetInnerHTML={{ __html: post.html }} />

            <Comments />
        </article>
    )
}
