import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

class UnconnectedThreadBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      threads: []
    }
  }
  componentDidMount = () => {
    fetch("http://localhost:4000/threads")
      .then(x => {
        return x.text()
      })
      .then(async responseBody => {
        let body = JSON.parse(responseBody)
        let threads = await Promise.all(
          body.threads.map(async thread => {
            let data = new FormData()
            data.append("authorId", thread.authorId)
            let authorName = await fetch("http://localhost:4000/authors", {
              method: "POST",
              body: data,
              credentials: "include"
            })
              .then(x => {
                return x.text()
              })
              .then(responseBody => {
                let body = JSON.parse(responseBody)
                let authorName = body.userData.name
                return authorName
              })
            return { ...thread, authorName }
          })
        )
        this.setState({
          threads: threads
        })
      })
  }
  render = () => {
    let searchFiltered = this.state.threads.filter(
      thread =>
        thread.title.toLowerCase().includes(this.props.query) ||
        thread.description.toLowerCase().includes(this.props.query)
    )
    return (
      <div className="threadboard-container">
        {searchFiltered.map(thread => {
          let threadUrl = "http://localhost:4000/images" + thread.url
          let threadLink = "/thread/" + thread.threadId
          let authorLink = "/otheraccount/" + thread.authorId
          return (
            <Link className="threadboard-link-text" to={threadLink}>
              <div className="threadboard-box">
                <div className="threadboard-img-container">
                  <img src={threadUrl} className="threadboard-img" />
                </div>
                <div className="threadboard-textbox">
                  <div className="threadboard-first-line">
                    <Link className="threadboard-author-text" to={authorLink}>
                      {thread.authorName}
                    </Link>{" "}
                    posted about {thread.location.toUpperCase()}
                    {/* <div className="threadboard-location"></div> */}
                  </div>
                  <h3>{thread.title}</h3>

                  <div className="threadboard-description">
                    {thread.description}
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    )
  }
}
let mapStateToProps = state => {
  return {
    query: state.searchQuery
  }
}
let ThreadBoard = connect(mapStateToProps)(UnconnectedThreadBoard)

export default ThreadBoard
