import React from "react"
import { Router, Link, Location } from "@reach/router"
import '../sass/index.scss'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

const App = () => (
  <div className="app">
    <nav className="nav">
      <Link to="/">Page 1</Link>
      <Link to="/page22">Page 22</Link>
      <Link to="page/2">Page 2</Link>
      <Link to="page/3">Page 3</Link>
      <Link to="page/4">Page 4</Link>
    </nav>

    <FadeTransitionRouter>

    </FadeTransitionRouter>
  </div>
)

const FadeTransitionRouter = props => (
  <Location>
    {({ location }) => (
      <div>
        <Router location={location} className="sass-nav-example ">
          <Page path="/" page="1" />
          <Page path="page/:page" />
        </Router>
      </div>
    )}
  </Location>
)

const Page = props => (
  <div>
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>

      {props.page}

      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
      <Link to="/blog/">BLOG</Link>
    </Layout>
  </div>
)

export default App
