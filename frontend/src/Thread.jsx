import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

class UnconnectedThread extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: ""
    }
  }
  handleCommentChange = event => {
    this.setState({ comment: event.target.value })
  }

  submitComment = event => {
    event.preventDefault()
    console.log("submitting a new thread")
    let data = new FormData()
    data.append("userId", this.props.userData.userId)
    data.append("url", this.state.url)
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
  findAuthorName = userId => {
    return fetch("http://localhost:4000/authors/" + userId, {
      credentials: "include"
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        return data.userData.name
      })
  }

  getThread = threadId => {
    return fetch("http://localhost:4000/threads/" + threadId, {
      credentials: "include"
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        return data.thread
      })
  }

  async componentWillMount() {
    try {
      let { threadId } = this.props.match.params //or let threadId = this.props.match.params.treadId
      const thread = await this.getThread(threadId)
      const authorName = await this.findAuthorName(thread.authorId)
      thread.authorName = authorName
      return this.setState({ thread })
    } catch (error) {
      console.log("ERRROR", error)
    }
  }
  renderComments(thread) {
    let commentSection = null
    if (thread.comments) {
      commentSection = thread.comments.map(comment => {
        return (
          <div>
            <div>{comment.commentorName}</div>
            <div>{comment.comment}</div>
            {comment.replies.map(reply => {
              return (
                <div>
                  <div>{reply.commentorName}</div>
                  <div>{reply.comment}</div>
                </div>
              )
            })}
          </div>
        )
      })
      return commentSection
    }
    return <div>Be the first one to comment!</div>
  }

  render = () => {
    let thread = this.state.thread
    if (!thread) {
      return <div>loading...</div>
    }
    let threadUrl = "http://localhost:4000/images" + thread.url
    return (
      <div className="thread-container">
        <div className="thread-box">
          <img className="thread-img" src={threadUrl} />
          <h3>{thread.title}</h3>
          <div>{thread.authorName}</div>
          <div>{thread.description}</div>
          <div className="thread-comment-section">
            <h3>Comment Section</h3>
            <form className="profile-container" onSubmit={this.submitComment}>
              <div>
                <input
                  className="info-box"
                  type="text"
                  onChange={this.handleTitleChange}
                  placeholder="Add a public comment"
                />
                <input type="submit" />
              </div>
            </form>
            {this.renderComments(thread)}
          </div>
        </div>
      </div>
    )
  }
}

let Thread = connect()(UnconnectedThread)

export default Thread
