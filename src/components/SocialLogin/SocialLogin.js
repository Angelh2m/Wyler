import React, { Component } from 'react'
import { GoogleLogin } from 'react-google-login';
// import TwitterLogin from 'react-twitter-auth'
import googleIcon from '../../images/icons/google.png'
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import './Sociallogin.scss'
import { ENDPOINTS } from '../../services/apiCalls'
// import jwtDecode from 'jwt-decode';

export default class SocialLogin extends Component {
  constructor(props) {
    super(props)
    this.state = { userData: {} }

    this.logUserOut = this.logUserOut.bind(this)
    this.responseGoogle = this.responseGoogle.bind(this)
  }

  onFailed(resp) {
    console.log(resp)
  }

  onSuccess(resp) {
    console.log(resp)
  }

  componentDidMount() {
    try {
      const userData = JSON.parse(localStorage.getItem('social'));
      this.setState({ userData: userData })

    } catch (error) {

    }
  }


  logUserOut() {
    localStorage.removeItem('social')
    this.setState({ userData: null })
  }

  // <TwitterLogin loginUrl="http://localhost:4000/api/v1/auth/twitter"
  // onFailure={this.onFailed} onSuccess={this.onSuccess}
  // requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse" />

  responseFacebook(res) {
    console.log('FBRESPO', res)
  }

  componentClicked(res) {
    console.log(res)
  }



  async responseGoogle(response) {

    // _Save users information to DB
    const res = await ENDPOINTS.registerUser(response)

    let userSchema;

    if (res) {
      userSchema = {
        name: response.profileObj.name,
        firstName: response.profileObj.givenName,
        lastName: response.profileObj.familyName,
        avatar: response.profileObj.imageUrl,
        id: response.googleId,
        exp: response.expires_at
      }
    }

    // SET in localStorage and State
    localStorage.setItem('social', JSON.stringify(userSchema))
    this.setState({ userData: userSchema })
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
