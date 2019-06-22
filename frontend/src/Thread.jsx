import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

class UnconnectedThread extends Component {
  constructor(props) {
    super(props)
    this.state = {}
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
      console.log("THREAD ID", threadId)
      const thread = await this.getThread(threadId)
      const authorName = await this.findAuthorName(thread.authorId)
      thread.authorName = authorName
      console.log("THREAD TO BE SET STATE", thread)
      return this.setState({ thread })
    } catch (error) {
      console.log("ERRROR", error)
    }
  }
  renderComments(thread) {
    console.log("THREAD RENDER COMMENTS", thread)
    thread.comments.map(comment => {
      return (
        <div>
          <h3>Comment Section</h3>
          <div>{comment[0].commentorName}</div>
          <div>{comment[0].comment}</div>
          {comment[1].map(reply => {
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
  }

  render = () => {
    console.log("STATE", this.state)
    let thread = this.state.thread
    if (!thread) {
      return <div>loading...</div>
    }
    console.log("THREAD URL", thread.url)
    let threadUrl = "http://localhost:4000/images" + thread.url
    return (
      <div className="thread-box">
        <img className="thread-img" src={threadUrl} />
        <h3>{thread.title}</h3>
        <div>{thread.authorName}</div>
        <div>{thread.description}</div>
        <div className="margin-bottom">{this.renderComments(thread)}</div>
      </div>
    )
  }
}

let Thread = connect()(UnconnectedThread)

export default Thread
