import React from 'react'
import { Link } from '@reach/router'
import Img from 'gatsby-image'
import SocialMedia from '../components/SocialMedia/SocialMedia'
import './FrontPage.scss'

export default function FrontPageLayout({ data, language }) {

    let url = language ? `es/` : "";

    return (
        <article>
            {data.allMarkdownRemark.edges.map((post, i) => (

                <section key={i} className="container--flex front__spacer">
                    <div className="col-1 posts__social-column">
                        <SocialMedia post={post.node.frontmatter} language={url} />
                    </div>
                    <div className="col-7 ">
                        <Link
                            to={`${url}${post.node.frontmatter.category}/${
                                post.node.frontmatter.slug
                                }`}
                        >
                            <h2>{post.node.frontmatter.title}</h2>
                        </Link>
                        {post.node.frontmatter.featuredImage && (
                            <Link to={`${url}${post.node.frontmatter.category}/${
                                post.node.frontmatter.slug
                                }`}
                            >
                                <Img fluid={post.node.frontmatter.featuredImage.childImageSharp.fluid}
                                />
                            </Link>
                        )}

                        <div className="posts__content">
                            <div
                                key={`body`}
                                dangerouslySetInnerHTML={{ __html: post.node.excerpt }}
                            />
                            <Link
                                to={`${url}${post.node.frontmatter.category}/${
                                    post.node.frontmatter.slug
                                    }`}
                            >
                                <span className="button--read-more ">
                                    {' '}
                                    READ MORE<i className="icon-arrow-right" />
                                </span>
                            </Link>
                        </div>
                    </div>
                </section>
            ))}
            <div />
        </article>
    )
}
