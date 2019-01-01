import React, { Component } from 'react'

export default class Posts extends Component {
    render() {
        console.log(this.props.data);

        return (
            <div>
                <h3>HELLO!!!</h3>
            </div>
        )
    }
}

// export const articleQuery = graphql`

//     query articles {

//     }

// `