import React, { Component } from 'react'

import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import googleIcon from '../../images/icons/google.png'
import { ENDPOINTS } from '../../services/apiCalls'
import './Sociallogin.scss'


export default class SocialLogin extends Component {
  constructor(props) {
    super(props)
    this.state = { userData: {} }
    this.logUserOut = this.logUserOut.bind(this)
    this.responseGoogle = this.responseGoogle.bind(this)
    this.responseFacebook = this.responseFacebook.bind(this)
  }


  componentDidMount() {
    try {
      this.setState({ userData: JSON.parse(localStorage.getItem('social')) })
    } catch (error) { }
  }


  logUserOut() {
    localStorage.removeItem('social')
    this.setState({ userData: null })
  }

  responseFacebook(response) {
    if (!response.error) { return }
    return async (response) => {

      let userSchema = {
        name: response.name,
        firstName: response.name,
        lastName: response.name,
        email: response.email,
        avatar: response.picture.data.url,
        socialID: response.userID,
        exp: response.expiresIn
      }

      // _Save users information to DB
      const res = await ENDPOINTS.registerUser(userSchema)
      console.log(res);
      // SET in localStorage and State
      localStorage.setItem('social', JSON.stringify(userSchema))
      this.setState({ userData: userSchema })

    }
  }

  componentClicked(res) {
    console.log(res)
  }



  responseGoogle(response) {
    console.log("response", response);

    return async (response) => {
      let userSchema;

      if (!response.error) { return }

      if (response && !response.error) {
        userSchema = {
          name: response.profileObj.name,
          firstName: response.profileObj.givenName,
          lastName: response.profileObj.familyName,
          email: response.profileObj.email,
          avatar: response.profileObj.imageUrl,
          socialID: response.googleId,
          exp: response.expires_at
        }
      }
      console.warn(userSchema);
      // _Save users information to DB
      const res = await ENDPOINTS.registerUser(userSchema)
      console.log(res);
      // SET in localStorage and State
      localStorage.setItem('social', JSON.stringify(userSchema))
      this.setState({ userData: userSchema })
    }
  }

  render() {


    return (
      <div className="social--login">


        {/* 
        * LOGGING BUTTONS
         */}

        {!this.state.userData && (
          <div>
            <FacebookLogin
              appId="209211756650633"
              autoLoad={false}
              fields="name,email,picture"
              onClick={this.componentClicked}
              callback={this.responseFacebook}
              icon="icon-facebook"
              render={renderProps => (
                <button className="button--facebook" onClick={renderProps.onClick}>
                  {' '}
                  Login With Facebook{' '}
                </button>
              )}
            />

            <GoogleLogin
              clientId="431810918658-gedmt7omgjmlk18vgb50g2eqjvr8ln4q.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              render={renderProps => (
                <button className="button--google" onClick={renderProps.onClick}>
                  <img className="google__login--image" src={googleIcon} alt="" />
                  <span className="google__text"> Login with Google</span>
                </button>
              )}
            />
          </div>
        )}


        {/* 
        * STATUS OF THE USER
         */}

        {this.state.userData && (

          <div>

            <div className="container--flex comments__header-format">
              <img className="form-comments__avatar" src={this.state.userData.avatar} alt="" />

              <span className="comments__user" >{this.state.userData.name} </span>

              <span className="link" onClick={this.logUserOut} >LOGOUT</span>
            </div>

          </div>

        )}

      </div>
    )
  }
}
