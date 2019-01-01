import React, { Component } from 'react'
import BlogPost from '../templates/blog-post';
import Axios from 'axios';


export default class blog extends Component {

    constructor(props) {
        super(props)

        this.state = { 'data': "ok" }

        this.fetchMe = this.fetchMe.bind(this);
        this.fetchMe();
    }

    fetchMe() {
        return Axios.get('https://swapi.co/api/people/1/')
            .then((response) => {
                return response.data
            })
            .then((myJson) => {
                this.setState({ 'data': myJson })
                console.log(myJson);
                console.log(JSON.stringify(myJson));
            });
    }

    render() {
        console.warn(this.state.data.name);
        console.warn(this.props);
        console.warn(this.props.data);

        return (
            <div>
                <BlogPost />
                <h2>FETCHH</h2>
                <button onClick={this.fetchMe}> CLick</button>
                <p>
                    {this.state.data.name}
                </p>
            </div>
        )
    }
}


export const postQuery = graphql`

    query postQuery {
        allInternalPosts{
            edges{
                node{
                title
                author
                }
            } 
        }
        allMarkdownRemark{
            edges {
               node {
                 html
               }
           }
         }
    }
`