import React from 'react'
import { Router, Link, Location } from '@reach/router'
import Post from '../pages/Post'

export default function Navigation() {
  return (
    <div>
      <div className="app">
        <nav className="nav">
          <Link to="/">Page 1</Link>
          <Link to="/living/page22">Page 22</Link>
          <Link to="postOne">POST 1</Link>
          <Link to="postTwo">POST 2</Link>
          <Link to="PostThree">POST 3</Link>
        </nav>
        <FadeTransitionRouter />
      </div>
    </div>
  )
}

const FadeTransitionRouter = props => (
  <Location>
    {({ location }) => (
      <div>
        <Router location={location} className="sass-nav-example ">
          <Post path="/:page" page="1" />
        </Router>
      </div>
    )}
  </Location>
)
