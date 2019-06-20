import React, { Component } from "react"
import { connect } from "react-redux"

class UnconnectedMyAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pic: this.props.userData.pic,
      userId: this.props.userData.userId,
      username: this.props.userData.username,
      password: this.props.userData.password,
      name: this.props.userData.name,
      bio: this.props.userData.bio,
      description: this.props.userData.description
    }
  }

  renderModifyProfile = () => {
    this.props.dispatch({
      type: "modify-profile"
    })
  }

  handlePasswordChange = event => {
    this.setState({ password: event.target.value })
  }

  handleNameChange = event => {
    this.setState({ name: event.target.value })
  }

  handleBioChange = event => {
    this.setState({ bio: event.target.value })
  }

  handleDescriptionChange = event => {
    this.setState({ description: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log("updating profile handle submit")
    let data = new FormData()
    data.append("userId", this.props.userData.userId)
    data.append("username", this.props.userData.username)
    data.append("password", this.state.password)
    data.append("name", this.state.name)
    data.append("bio", this.state.bio)
    data.append("description", this.state.description)
    data.append("pic", this.state.pic)
    console.log("right before fetch", data)
    fetch("http://localhost:4000/modify-profile", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(x => {
        return x.text()
      })
      .then(responseBody => {
        console.log(responseBody)
        this.props.dispatch({
          type: "submit-profile-modification",
          newProfile: this.state
        })
      })
  }
  render = () => {
    console.log("rendering profile")
    console.log(this.props.userData.pic)
    let url = "http://localhost:4000/images" + this.props.userData.pic
    if (this.props.modifyProfile) {
      return (
        <form className="profile-container" onSubmit={this.handleSubmit}>
          <div>
            Password
            <input
              className="info-box"
              type="text"
              onChange={this.handlePasswordChange}
              value={this.state.password}
            />
          </div>
          <div>
            Name
            <input
              className="info-box"
              type="text"
              onChange={this.handleNameChange}
              value={this.state.name}
            />
          </div>
          <div>
            Bio
            <input
              className="info-box"
              type="text"
              onChange={this.handleBioChange}
              value={this.state.bio}
            />
          </div>
          <div>
            Description
            <input
              className="info-box"
              type="text"
              onChange={this.handleDescriptionChange}
              value={this.state.description}
            />
          </div>
          <input type="submit" />
        </form>
      )
    }
    // let url = "http://localhost:4000/images" + this.props.userData.pic
    return (
      <div className="profile-container">
        <img className="profile-pic" src={url} />
        <h4>{this.props.userData.name}</h4>
        <div className="info-account">{this.props.userData.bio}</div>
        <div className="info-account">{this.props.userData.description}</div>
        <button className="login-button" onClick={this.renderModifyProfile}>
          Modify
        </button>
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    userData: state.userData,
    modifyProfile: state.modifyProfile
  }
}
let MyAccount = connect(mapStateToProps)(UnconnectedMyAccount)

export default MyAccount
