import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

class UnconnectedThread extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newComment: ""
    }
  }
  handleCommentChange = event => {
    this.setState({ newComment: event.target.value })
  }

  submitComment = event => {
    event.preventDefault()
    console.log("submitting a new thread")
    let data = new FormData()
    data.append("name", this.props.userData.name)
    data.append("newComment", this.state.newComment)
    fetch("http://localhost:4000/new-comment", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(x => {
        return x.text()
      })
      .then(responseBody => {
        console.log(responseBody)
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

  renderCommentSubmition = user => {
    console.log("ARE WE LOGGED IN?", this.props.userData)
    if (user) {
      return (
        <form className="thread-comment-entry" onSubmit={this.submitComment}>
          <div>
            <input
              className="info-box"
              type="text"
              onChange={this.handleCommentChange}
              placeholder="Add a public comment"
            />
            <input type="submit" />
          </div>
        </form>
      )
    }
    return <div>Login to comment</div>
  }

  renderComments = thread => {
    let commentSection = null
    if (thread.comments) {
      commentSection = thread.comments.map(comment => {
        return (
          <div className="thread-comment-container">
            <div className="thread-comment">
              <Link
                className="thread-comment-author"
                to={"/otheraccount/" + comment.commentorId}
              >
                {comment.commentorName}
              </Link>
              <div>{comment.comment}</div>{" "}
            </div>
            <div className="thread-reply-container">
              {comment.replies.map(reply => {
                return (
                  <div className="thread-reply">
                    <Link
                      className="thread-comment-author"
                      to={"/otheraccount/" + reply.replierId}
                    >
                      {reply.replierName}
                    </Link>
                    <div>{reply.reply}</div>
                  </div>
                )
              })}
            </div>
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
          <h3>{thread.title}</h3>{" "}
          <Link
            className="thread-author-text"
            to={"/otheraccount/" + thread.authorId}
          >
            {thread.authorName}
          </Link>
          <div className="thread-description">{thread.description}</div>
          <div className="thread-comment-section">
            <hr />
            <h3>Comment Section</h3>
            {this.renderCommentSubmition(this.props.userData)}
            {this.renderComments(thread)}
          </div>
        </div>
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    userData: state.userData
  }
}

let Thread = connect(mapStateToProps)(UnconnectedThread)

export default Thread
