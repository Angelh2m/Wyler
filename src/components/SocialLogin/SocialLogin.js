import React, { Component } from 'react'
import { GoogleLogin } from 'react-google-login';
// import TwitterLogin from 'react-twitter-auth'
import googleIcon from '../../images/icons/google.png'
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import './Sociallogin.scss'
import { ENDPOINTS } from '../../services/apiCalls'

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


  // componentDidMount() {
  //   console.log("SOCIAL LOGINs");

  //   const userData = JSON.parse(localStorage.getItem('social'))

  //   localStorage.setItem('social', "DON")

  //   if (!userData) {
  //     // ENABLE POP OUT
  //     return this.setState({ message: 'You are not logged in' })
  //   }

  //   if (userData) {
  //     return this.setState({ userData })
  //   }
  // }

  logUserOut() {
    localStorage.removeItem('social')
    this.setState({ userData: [] })
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
    // console.log("GOOGLE RESPONSe ", response)
    localStorage.setItem('social', JSON.stringify(response))
    this.setState({ userData: response })

    const res = await ENDPOINTS.registerUser(this.state.userData)

    console.log("LOGIN", res);


  }

  render() {
    // const 

    // const loggedUser = this.state.userData ? this.state.userData.profileObj : ''

    return (
      <div className="social--login">

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


        <div>

          <div className="container--flex comments__header-format">
            <img className="form-comments__avatar" src="https://lh6.googleusercontent.com/-S0uKoBOmR4c/AAAAAAAAAAI/AAAAAAAADIs/HfTIwyQkpF4/s96-c/photo.jpg" alt="" />

            {/* <span className="comments__user" >{loggedUser.givenName} {loggedUser.familyName}</span> */}

            {/* <span className="link" onClick={this.logUserOut} >LOGOUT</span> */}
          </div>


        </div>
      </div>
    )
  }
}
