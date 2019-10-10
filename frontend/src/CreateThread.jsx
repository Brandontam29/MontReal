import React, { Component } from "react"
import { connect } from "react-redux"
import ThreadBoard from "./ThreadBoard.jsx"

class UnconnectedCreateThread extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authorId: this.props.userData.userId,
      url: "",
      location: "",
      title: "",
      description: "",
      imageName: ""
    }
  }

  handleUrlChange = event => {
    this.setState({ url: "/" + event.target.files[0].name })
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
    let data = new FormData()
    data.append("userId", this.props.userData.userId)
    data.append("url", this.state.url)
    data.append("location", this.state.location)
    data.append("title", this.state.title)
    data.append("description", this.state.description)
    fetch("http://localhost:4000/create-thread", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(x => {
        return x.text()
      })
      .then(responseBody => {
        return (
          <script LANGUAGE="JavaScript">
            {window.alert("Succesfully Updated")}
            {window.history.back()}
          </script>
        )
      })
  }

  render = () => {
    if (this.props.loggedIn) {
      return (
        <form className="profile-container" onSubmit={this.submitThread}>
          <div className="create-thread-container">
            <div>
              <h4>Image</h4>
              <input
                type="file"
                onChange={this.handleUrlChange}
                placeholder="Choose Image"
              />
            </div>
            <div>
              <h4>Location</h4>
              <input
                type="text"
                onChange={this.handleLocationChange}
                value={this.state.location}
              />
            </div>
            <div>
              <h4>Title</h4>
              <input
                type="text"
                onChange={this.handleTitleChange}
                value={this.state.title}
                className="create-thread-title"
              />
            </div>

            <div>
              <h4>Description</h4>
              <textarea
                type="text"
                onChange={this.handleDescriptionChange}
                value={this.state.description}
                className="create-thread-description"
              />
            </div>
            <div className="button-fixed-height">
              <input className="action-button" type="submit" />
            </div>
          </div>
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
