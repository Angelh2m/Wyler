import React, { Component } from 'react'
import './Comments.scss'
import SocialLogin from '../SocialLogin/SocialLogin'
import { ENDPOINTS } from '../../services/apiCalls'

export default class Comments extends Component {
  constructor(props) {
    super(props)

    this.state = {
      comments: [],
      userData: '',
      message: '',
    }
    this.upDateFormData = this.upDateFormData.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.comments = {}
  }

  componetDidMount() {
    this.setState({ userData: JSON.parse(localStorage.getItem('social')) })
  }

  upDateFormData(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  async onSubmit(event) {
    let userData = JSON.parse(localStorage.getItem('social'))

    if (!userData || !this.state.comment) {
      this.setState({ message: 'You must be logged in to post a comment' })
      return
    }

    let payload
    try {
      payload = {
        name: userData.name,
        firstName: userData.firstName,
        lastName: userData.lastName,
        avatar: userData.avatar,
        socialID: userData.socialID,
        exp: userData.exp,
        comment: this.state.comment,
        location: window.location.pathname,
      }
    } catch (error) {
      console.log(error)
    }

    const response = await ENDPOINTS.makeComment(payload)

    if (response) {
      console.log(response)
      this.setState({
        message: 'Comment has been sent! It will show in this post soon ',
      })
    }
  }

  render() {
    const comments = this.state.comments

    return (
      <div>
        <h3>Comments</h3>
        <div className="quickreply ">
          <button className="quickreply__button" onClick={this.onSubmit}>
            <span role="img" aria-label="Ghost">
              {' '}
              👻{' '}
            </span>
            This is awesome!
          </button>
          <button className="quickreply__button" onClick={this.onSubmit}>
            <span role="img" aria-label="Happy">
              {' '}
              😉{' '}
            </span>
            Love the topic!
          </button>
          <button className="quickreply__button" onClick={this.onSubmit}>
            <span role="img" aria-label="Ghost">
              {' '}
              👻{' '}
            </span>
            Kudos
          </button>
          <button className="quickreply__button" onClick={this.onSubmit}>
            <span role="img" aria-label="Ghost">
              {' '}
              👻{' '}
            </span>
            Keep it up!
          </button>
        </div>

        <SocialLogin />

        <div className="form-comments">
          {this.state.message && <h3>{this.state.message}</h3>}
          <textarea
            name="comment"
            onChange={this.upDateFormData}
            className="comments__form "
            placeholder="Hey leave me a comment!"
          />
          <button onClick={this.onSubmit} className="button--comment">
            SEND
          </button>
        </div>

        {comments &&
          comments.map((el, i) => (
            <div key={i} className="comments">
              <div className="container--flex comments__header-format">
                <div>
                  <img className="comments__avatar" src={el.id.avatar} alt="" />
                </div>
                <div>
                  <span className="comments__user">
                    {el.id.firstName} {el.id.lastName}
                  </span>
                  <time dateTime="2008-02-14 20:00">
                    {el.date ? new Date().toDateString(el.date) : ' '}
                  </time>
                </div>
              </div>
              <p>{el.comment}</p>
            </div>
          ))}
      </div>
    )
  }
}
