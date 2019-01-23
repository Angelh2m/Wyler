import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import Sidebar from '../components/Sidebar/Sidebar'

export default function CategoryLayout({ posts, language }) {
    let url = language ? `es/` : "";
    console.log(language);

    return (
        <article className="container--flex posts">
            <div className="col-7">
                {posts.map((post, i) => (
                    <article key={i} className="layout__search">
                        <div>
                            {post.node.frontmatter.featuredImage && (
                                <Link to={`${url}${post.node.frontmatter.category}/${
                                    post.node.frontmatter.slug
                                    }`}>
                                    <Img
                                        fluid={
                                            post.node.frontmatter.featuredImage.childImageSharp
                                                .fluid
                                        }
                                    />
                                </Link>
                            )}
                        </div>

                        <div className="layout__one">
                            <Link
                                to={`${url}${post.node.frontmatter.category}/${
                                    post.node.frontmatter.slug
                                    }`}
                            >
                                <h2> {post.node.frontmatter.title} </h2>
                            </Link>

                            <p>{post.node.excerpt}</p>

                            <Link
                                to={`${url}${post.node.frontmatter.category}/${
                                    post.node.frontmatter.slug
                                    }`}
                            >
                                <span className="button--read-more ">
                                    READ MORE<i className="icon-arrow-right" />
                                </span>
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
            <aside className="col-2-half">
                <Sidebar />
            </aside>
        </article>
    )
}
