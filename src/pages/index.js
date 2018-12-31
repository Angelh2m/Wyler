import React from "react"
import { Router, Link, Location } from "@reach/router"

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
        <Router location={location} className="router">
          <Page path="/" page="1" />
          <Page path="page/:page" />
        </Router>
      </div>
    )}
  </Location>
)

const Page = props => (
  <div>
    {props.page}
  </div>
)

export default App
