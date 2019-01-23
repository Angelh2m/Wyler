import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { schemaMarkup } from './schemaMarkup'

function SEO({
  description,
  images,
  postURL,
  postDate,
  category,
  lang,
  meta,
  keywords,
  recipe,
}) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description
        const title = data.site.siteMetadata.title
        const image = images ? images.childImageSharp.fluid.src : ''

        let schemaOrgJSONLD = schemaMarkup(
          title,
          metaDescription,
          image,
          postURL,
          postDate,
          category,
          lang,
          meta,
          keywords,
          recipe
        )
        console.log(schemaOrgJSONLD)

        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
            meta={[
              {
                name: 'google-site-verification',
                content: 'bPKW2alhS-mxTsMPaCtDWJMb7_rD1stXp-Ib5h6E1W8',
              },
              {
                name: 'msvalidate.01',
                content: '9DF2928A5A20B293151BE340944A9788',
              },
              {
                name: 'p:domain_verify',
                content: '12d638895bd5e0ca6611ea6a5e88dad3',
              },
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:title`,
                content: title,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                name: `twitter:card`,
                content: `summary`,
              },
              {
                name: `twitter:creator`,
                content: data.site.siteMetadata.author,
              },
              {
                name: `twitter:title`,
                content: title,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
            ]
              .concat(
                keywords.length > 0
                  ? {
                      name: `keywords`,
                      content: keywords.join(`, `),
                    }
                  : []
              )
              .concat(meta)}
          >
            {/* Schema.org tags */}

            <script type="application/ld+json">
              {JSON.stringify(schemaOrgJSONLD)}
            </script>
          </Helmet>
        )
      }}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
}

export default SEO

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
