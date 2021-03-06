import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

class UnconnectedLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      img: ""
    }
  }

  handleUsernameChange = event => {
    console.log("password: ", event.target.value)
    this.setState({ username: event.target.value })
  }

  handlePasswordChange = event => {
    console.log("password: ", event.target.value)
    this.setState({ password: event.target.value })
  }
  handleSubmit = event => {
    event.preventDefault()
    console.log("Login attempt")
    let data = new FormData()
    data.append("username", this.state.username)
    data.append("password", this.state.password)
    fetch("http://localhost:4000/login", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(x => {
        return x.text()
      })
      .then(responseBody => {
        let body = JSON.parse(responseBody)
        console.log(responseBody)
        console.log(body)
        if (body.userData === null) {
          alert("login failed")
          return
        }
        console.log(body.userData)
        this.props.dispatch({
          type: "login-success",
          user: body.userData
        })
      })
  }

  goNavigate = () => window.history.back()

  render = () => {
    if (!this.props.loggedIn) {
      return (
        <div className="login-container">
          <h3>Login</h3>
          <form className="flex-column" onSubmit={this.handleSubmit}>
            <div className="info-bar">
              <input
                className="info-box"
                type="text"
                onChange={this.handleUsernameChange}
                placeholder="Username"
              />
            </div>
            <div className="info-bar">
              <input
                className="info-box"
                type="password"
                onChange={this.handlePasswordChange}
                placeholder="Password"
              />
            </div>
            <div className="button-fixed-height">
              <input className="action-button" type="submit" />
            </div>
          </form>
          <div>
            New to MontReal?{" "}
            <Link className="resend-link" to="/signup">
              Sign Up now
            </Link>
          </div>
        </div>
      )
    }
    return (
      <div className="login-success-container">
        <h2>You have successfully logged in!</h2>
        <div className="button-fixed-height">
          <button className="action-button" onClick={this.goNavigate}>
            Click
          </button>{" "}
          to go back navigating!
        </div>
      </div>
    )
  }
}
let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  }
}
let Login = connect(mapStateToProps)(UnconnectedLogin)
export default Login
