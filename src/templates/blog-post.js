import React, { Component } from 'react'

export default class BlogPost extends Component {
    render() {
        console.log(this.props.data);

        return (
            <div>
                <h3>HELLO!!!</h3>
            </div>
        )
    }
}

export const articleQuery = graphql`

    query articles {

        allFile (filter: { 
            name: { eq : "one" } 
            sourceInstanceName: { eq : "articles" }
          }) {
            edges {
              node {
                childArticlesJson {
                  title
                }
              }
            }
          }
    }

`