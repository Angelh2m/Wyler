import React, { Component } from 'react'
import { Link } from 'gatsby'
import './Header.scss'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: false,
      search: '',
      urlPath: ''
    }
    this.toggle = this.toggle.bind(this)
    this.search = this.search.bind(this)

    this.searchTerm = React.createRef()

    // const x = window.location.pathname.split('/')[1];
    // console.log(this.state.urlPath);

    // console.log("==> ");
    // console.warn(x[1]);

  }

  componentDidMount() {
    this.setState({ urlPath: this.props.language })
  }

  toggle() {
    this.setState({ isActive: !this.state.isActive })
  }

  search(e) {
    if (e.keyCode === 13 || e.type === 'click') {
      this.setState({ isActive: !this.state.isActive })
      this.props.history.push(this.searchTerm.current.value)
    }
  }

  navigationES() {
    return (
      <nav className="c_header__bottom" role="navigation">
        <strong>
          <Link to="/es" className="logo">
            Living With Annah
              </Link>
        </strong>
        <div>
          <ul>
            {/* <li>
              <Link to="es/lifestyle">Lifestyle</Link>
            </li> */}
            <li>
              <Link hrefLang="es" to="es/blog">Blog</Link>
            </li>
            <li>
              <Link hrefLang="es" to="es">Inicio</Link>
            </li>

            {/* <div className="c_header__burger">
                  {!this.state.isActive && (
                    <i className="icon-burger--button" onClick={this.toggle} />
                  )}
                  {this.state.isActive && (
                    <i className="icon-close--button" onClick={this.toggle} />
                  )}
                </div> */}
          </ul>
        </div>
      </nav>
    )
  }

  navigation() {
    return (
      <nav className="c_header__bottom" role="navigation">
        <strong>
          <Link to="/" className="logo">
            Living With Annah
              </Link>
        </strong>
        <div>
          <ul>
            <li>
              <Link to="/lifestyle">Lifestyle</Link>
            </li>
            <li>
              <Link to="/travel">Travel</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>

            {/* <div className="c_header__burger">
                  {!this.state.isActive && (
                    <i className="icon-burger--button" onClick={this.toggle} />
                  )}
                  {this.state.isActive && (
                    <i className="icon-close--button" onClick={this.toggle} />
                  )}
                </div> */}
          </ul>
        </div>
      </nav>
    )
  }

  render() {
    // const activeNavigation = (
    //   "c_header__side_navigation",
    //   {
    //     ["c_header__side_navigation__show"]: this.state.isActive,
    //     ["c_header__side_navigation__hidden"]: !this.state.isActive
    //   });

    return (
      <div className="c_header">
        <header role="banner">
          {/* {this.searchTerm.length > 1 && (
            <Redirect to={`/${this.searchTerm}`} />
          )} */}
          <div className="c_header__top">
            <div>
              {!this.state.urlPath && (
                <Link to="/es">Español</Link>
              )}
              {this.state.urlPath === 'es/' && (
                <Link to="/">English</Link>
              )}

            </div>
            <div>
              <a
                href="https://www.facebook.com/Living-with-Annah-292792198088448/"
                rel="noopener norefferer"
                target="blank"
              >
                <i className="icon-facebook"> </i>
              </a>
              <a
                href="https://www.instagram.com/livingwithannah/"
                rel="noopener norefferer"
                target="blank"
              >
                <i className="icon-instagram" />
              </a>
              <a
                href="https://twitter.com/LivingWithAnnah"
                rel="noopener norefferer"
                target="blank"
              >
                <i className="icon-twitter"> </i>
              </a>
              <a
                href="https://www.youtube.com/channel/UCy0ejwjwFV-P8r1it_jJHEw"
                rel="noopener norefferer"
                target="blank"
              >
                <i className="icon-youtube"> </i>
              </a>
              <a
                href="https://www.pinterest.com/livingwithannah/"
                rel="noopener norefferer"
                target="blank"
              >
                <i className="icon-pinterest2"> </i>
              </a>
            </div>
          </div>

          {this.state.urlPath === 'es' && (
            this.navigationES()
          )}
          {this.state.urlPath !== 'es' && (
            this.navigation()
          )}


        </header>
        {this.state.isActive && (
          <div onClick={this.toggle} className="c_header__background">  BACKGROUND </div>
        )}

        {/* <div
          className={`c_header__side_navigation ${
            this.state.isActive
              ? 'c_header__side_navigation__show'
              : 'c_header__side_navigation__hidden'
            } `}
        >
          <i onClick={this.search} className="icon-search--button" />
          <input
            onKeyDown={this.search}
            ref={this.searchTerm}
            className="c_header__search"
            type="text"
            placeholder="Search..."
          />
          <hr />

          <h3>Shop</h3>
          <li>SHOP THE COLLECTION</li>
          <li>SHOP DAILY LOOKS</li>
          <li>SHOP JULIA’S PICKS</li>
          <h3>Style</h3>
          <li>JULIA’S STYLE</li>
          <h3>RESSES</h3>
          <li>ACCESSORIES</li>
          <li>CLASSIC</li>
          <li>SPRING</li>
        </div> */}
      </div>
    )
  }
}

export default Header
