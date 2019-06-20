import React, { Component } from "react"
import { connect } from "react-redux"

class UnconnectedSignup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    }
  }
  componentDidMount = () => {}

  handleUsernameChange = event => {
    console.log("username: ", event.target.value)
    this.setState({ username: event.target.value })
  }

  handlePasswordChange = event => {
    console.log("password: ", event.target.value)
    this.setState({ password: event.target.value })
  }
  handleSubmit = event => {
    event.preventDefault()
    console.log("hit signup")
    let data = new FormData()
    data.append("username", this.state.username)
    data.append("password", this.state.password)
    fetch("http://localhost:4000/signup", {
      method: "POST",
      body: data,
      credentials: "include"
    })
    alert("signup successful!")
  }

  render = () => {
    return (
      <div className="login-container">
        <h3>Sign Up</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="info-bar">
            Username:
            <input
              className="info-box"
              type="text"
              onChange={this.handleUsernameChange}
            />
          </div>
          <div className="info-bar">
            Password:
            <input
              className="info-box"
              type="password"
              onChange={this.handlePasswordChange}
            />{" "}
          </div>
          <input className="login-button" type="submit" />
        </form>
      </div>
    )
  }
}
let Signup = connect()(UnconnectedSignup)
export default Signup
