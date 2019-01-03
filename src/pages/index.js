import React from 'react'
import FrontPage from '../templates/FrontPage'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Sidebar from '../components/Sidebar/Sidebar'


const App = () => (
  <Layout>
    {/* <Navigation /> */}
    <SEO title="Wellcome!" keywords={[`gatsby`, `application`, `react`]} />

    <div className="container--flex">
      <div className="container--flex posts">
        <div className="col-7">
          <FrontPage />
        </div>
        <aside className="col-2-half">
          <Sidebar />
        </aside>
      </div>
    </div>
  </Layout>
)

export default App
