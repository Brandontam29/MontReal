import React, { Component } from "react"
import { connect } from "react-redux"
import { BrowserRouter, Route, Link } from "react-router-dom"
import Signup from "./Signup.jsx"
import Login from "./Login.jsx"
import MyAccount from "./MyAccount.jsx"
import OtherAccount from "./OtherAccount.jsx"
import Map from "./Map.jsx"
import SearchBar from "./SearchBar.jsx"
import ThreadBoard from "./ThreadBoard.jsx"
import Thread from "./Thread.jsx"
import CreateThread from "./CreateThread.jsx"
import Footer from "./Footer.jsx"
import "./main.css"

class UnconnectedApp extends Component {
  renderRoot = () => {
    return (
      <div className="container">
        <div className="map-container">
          <Map />
        </div>
        <ThreadBoard />
      </div>
    )
  }

  renderLogin = () => <Login />

  renderSignup = () => <Signup />

  renderCreateThread = () => <CreateThread />

  renderMyAccount = () => <MyAccount />

  render = () => {
    return (
      <BrowserRouter>
        <div className="navigation-bar">
          <Link to="/">
            <img
              className="logo"
              src="http://localhost:4000/images/MontReal_black.png"
            />
          </Link>
          <SearchBar />
          <div className="nav-bar-link-box">
            <Link className="nav-bar-links" to="/">
              Home
            </Link>
            {!this.props.loggedIn && (
              <Link className="nav-bar-links" to="/login">
                Login
              </Link>
            )}
            {!this.props.loggedIn && (
              <Link className="nav-bar-links" to="/signup">
                Sign Up
              </Link>
            )}
            {this.props.loggedIn && (
              <Link className="nav-bar-links" to="/createthread">
                Create Thread
              </Link>
            )}
            {this.props.loggedIn && (
              <Link className="nav-bar-links" to="/myaccount">
                My Account
              </Link>
            )}
          </div>
        </div>
        <Route exact={true} path="/" render={this.renderRoot} />
        <Route exact={true} path="/login" render={this.renderLogin} />
        <Route exact={true} path="/signup" render={this.renderSignup} />
        <Route exact={true} path="/thread/:threadId" component={Thread} />
        <Route
          exact={true}
          path="/createthread"
          render={this.renderCreateThread}
        />
        <Route exact={true} path="/myaccount" render={this.renderMyAccount} />
        <Route
          exact={true}
          path="/otheraccount/:userId"
          component={OtherAccount}
        />
        <Footer />
      </BrowserRouter>
    )
  }
}

let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    userData: state.userData
  }
}

let App = connect(mapStateToProps)(UnconnectedApp)

export default App
