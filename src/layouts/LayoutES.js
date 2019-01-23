import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from '../components/header/Header'
// import './layout.css'
import '../sass/Main.scss'
import Footer from '../components/Footer/Footer'

const LayoutES = ({ children }) => (
    <StaticQuery
        query={graphql`
      query SiteTitleQueryES {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
        render={data => (
            <>
                <Header siteTitle={data.site.siteMetadata.title} language="es/" />
                <main>{children}</main>
                <Footer />
            </>
        )}
    />
)

LayoutES.propTypes = {
    children: PropTypes.node.isRequired,
}

export default LayoutES
