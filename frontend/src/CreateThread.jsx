import React, { Component } from "react"
import { connect } from "react-redux"
import ThreadBoard from "./ThreadBoard.jsx"

class UnconnectedCreateThread extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authorId: this.props.userData.userId,
      // threadId: will be given by the back end
      url: "", //need to find a way to upload an image
      location: "",
      title: "",
      description: "",
      imageName: ""
    }
  }

  handleUrlChange = event => {
    this.setState({ url: event.target.value })
  }

  handleLocationChange = event => {
    this.setState({ location: event.target.value })
  }

  handleTitleChange = event => {
    this.setState({ title: event.target.value })
  }

  handleDescriptionChange = event => {
    this.setState({ description: event.target.value })
  }

  submitThread = event => {
    event.preventDefault()
    console.log("submitting a new thread")
    let data = new FormData()
    data.append("userId", this.props.userData.userId)
    data.append("url", "/" + this.state.url)
    data.append("location", this.state.location)
    data.append("title", this.state.title)
    data.append("description", this.state.description)
    console.log("right before fetch", data)
    fetch("http://localhost:4000/create-thread", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(x => {
        return x.text()
      })
      .then(responseBody => {
        console.log(responseBody)
        return (
          <script LANGUAGE="JavaScript">
            {window.alert("Succesfully Updated")}
            {window.history.back()}
          </script>
        )
      })
  }

  render = () => {
    console.log("rendering thread creation boxes")
    if (this.props.loggedIn) {
      return (
        <form className="profile-container" onSubmit={this.submitThread}>
          <div>
            Title
            <input
              className="info-box"
              type="text"
              onChange={this.handleTitleChange}
              value={this.state.title}
            />
          </div>
          <div>
            Location
            <input
              className="info-box"
              type="text"
              onChange={this.handleLocationChange}
              value={this.state.location}
            />
          </div>
          <div>
            Description
            <input
              className="info-box"
              type="text"
              onChange={this.handleDescriptionChange}
              placeholder="Tell us more about it!"
              value={this.state.description}
            />
          </div>
          <div>
            Image
            <input
              className="info-box"
              type="file"
              onChange={this.handleUrlChange}
              placeholder="Choose File"
              value={this.state.description}
            />
          </div>
          <input type="submit" />
        </form>
      )
    }
    return (
      <div className="goNavigate">
        <h2>Please login to create a thread!</h2>
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    userData: state.userData,
    threadCreated: state.threadCreated
  }
}

let CreateThread = connect(mapStateToProps)(UnconnectedCreateThread)

export default CreateThread
