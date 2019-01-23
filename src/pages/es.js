import React from 'react'
import FrontPageES from '../templates/FrontPageES'
import LayoutES from '../layouts/LayoutES'
import SEO from '../components/seo'
import Sidebar from '../components/Sidebar/Sidebar'

const AppES = () => (
  <LayoutES>
    {/* <Navigation /> */}
    <SEO title="Wellcome!" keywords={[`gatsby`, `application`, `react`]} />

    <div className="container--flex">
      <div className="container--flex posts">
        <div className="col-7">
          <FrontPageES />
        </div>
        <aside className="col-2-half">
          <Sidebar />
        </aside>
      </div>
    </div>
  </LayoutES>
)

export default AppES
