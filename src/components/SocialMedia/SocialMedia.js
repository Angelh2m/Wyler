import React from 'react'
import { Link } from '@reach/router'
import { shareThisPost } from '../../util/shareThis'
import './SocialMedia.scss'

export default function SocialMedia(props) {
  const { post } = props
  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  var today = new Date(post.date)
  return (
    <div>
      <div className="posts__side__meta">
        <span className="text__date">
          {today.toLocaleDateString('en-US', options)}
        </span>
        {post.category && (
          <Link to={`/${post.category}`}>
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
