import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

class UnconnectedThread extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newComment: "",
      selectedComment: null,
      newReply: "",
      replying: false
    }
  }

  handleCommentChange = event => {
    this.setState({ newComment: event.target.value })
  }

  // handleSelectedCommentChange = comment => {
  //   this.setState({ selectedComment: comment })
  //   console.log("THE STATE", this.state)
  // }

  handleReplyChange = event => {
    this.setState({ newReply: event.target.value })
  }

  submitComment = event => {
    event.preventDefault()

    let data = new FormData()
    data.append("currentThread", this.props.match.params.threadId)
    data.append("commentorName", this.props.userData.name)
    data.append("commentorId", this.props.userData.userId)
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
    console.log("comment submitted successfully")
  }

  submitReply = event => {
    event.preventDefault()
    console.log("Replying to ", this.state.selectedComment)
    let data = new FormData()
    data.append("currentThread", this.props.match.params.threadId)
    data.append("commentId", this.state.selectedComment)
    data.append("replierName", this.props.userData.name)
    data.append("replierId", this.props.userData.userId)
    data.append("newReply", this.state.newReply)

    fetch("http://localhost:4000/new-reply", {
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
    console.log("reply submitted successfully")
  }

  findAuthorName = async userId => {
    const response = await fetch("http://localhost:4000/authors/" + userId, {
      credentials: "include"
    })
    const data = await response.json()
    return data.userData.name
  }

  getThread = async threadId => {
    const response = await fetch("http://localhost:4000/threads/" + threadId, {
      credentials: "include"
    })
    const data = await response.json()
    return data.thread
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
    if (user.name) {
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
    return <Link><button className="">Login to comment</button></Link>
  }

  handleClick = () => {
    console.log("HANDLE CLICK")
  }

  renderReplySubmition = comment => {
    console.log("THIS IS A REPLY TO ", comment)
    return (
      <form className="thread-comment-entry" onSubmit={this.submitReply}>
        <div>
          <input
            className="info-box"
            type="text"
            onChange={this.handleReplyChange}
            placeholder="Add a reply"
          />
          <input type="submit" />
        </div>
      </form>
    )
  }

  renderReplyButton = comment => {
    console.log("RENDER REPLY", comment)
    if (this.props.userData.name) {
      if (!this.state.replying) {
        return (
          <button
            onClick={() => {
              this.setState({
                replying: true,
                selectedComment: comment.commentId
              })
            }}
          >
            Reply
          </button>
        )
      }
      if (this.state.selectedComment === comment.commentId) {
        return this.renderReplySubmition(comment)
      }
      return <div></div>
    }
    return <div></div>
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
              {this.renderReplyButton(comment)}
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
