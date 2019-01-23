import React from 'react'
import { Link } from '@reach/router'
import { shareThisPost } from '../../util/shareThis'
import './SocialMedia.scss'
import { dateFormat } from '../../util/dateFormat';

export default function SocialMedia(props) {
  let url = props.language ? `es/` : "";
  const { post } = props

  return (
    <div>
      <div className="posts__side__meta">
        <span className="text__date">
          {dateFormat(post.date, url)}
        </span>
        {post.category && (
          <Link to={`/${url}${post.category}`}>
            <span className="text__category--black ">
              {post.category.replace(/-/g, ' ')}
            </span>
          </Link>
        )}
      </div>
      <div className="posts__social__widget">
        <div className="posts__social__toggle">
          <i
            onClick={shareThisPost}
            id={post.seoUrl}
            className="icon-arrow-up--button"
          />
        </div>
        <div className="posts__social__label">
          <i onClick={shareThisPost} id={post.slug} className="icon-facebook">
            {' '}
          </i>
          <i onClick={shareThisPost} id={post.slug} className="icon-twitter">
            {' '}
          </i>
          <i
            onClick={shareThisPost}
            id={post.seoUrl}
            className="icon-pinterest2"
          >
            {' '}
          </i>
        </div>
      </div>
    </div>
  )
}
