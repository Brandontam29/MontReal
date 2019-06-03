import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

class UnconnectedThread extends Component {
  constructor(props) {
    super(props)
    this.state = {
      threadArray: []
    }
  }

  componentDidMount = () => {
    let { threadId } = this.props.match.params //or let threadId = this.props.match.params.treadId
    let data = new FormData()
    data.append("threadId", threadId)
    fetch("http://localhost:4000/thread", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(x => {
        return x.text()
      })
      .then(async responseBody => {
        console.log("generating thread")
        let body = JSON.parse(responseBody)
        console.log("THREAD DATA", body)
        this.setState({
          threadArray: body.threadData
        })
      })
  }

  render = () => {
    console.log("STATE", this.state)
    let thread = this.state.threadArray
    console.log("THREAD URL", thread.url)
    let threadUrl = "http://localhost:4000/images" + thread.url
    return (
      <div className="thread-box">
        <img className="thread-img" src={threadUrl} />
        <h3>{thread.title}</h3>
        <div>{thread.authorName}</div>
        <div>{thread.description}</div>
        <div className="margin-bottom">
          <h3>Comment Section</h3>
        </div>
      </div>
    )
  }
}

let Thread = connect()(UnconnectedThread)

export default Thread

/* {thread.comments.map(comment => {
            return (
              <div>
                <div>{comment[0].commentorName}</div>
                <div>{comment[0].comment}</div>
                {comment[1].map(reply => {
                  return (
                    <div>
                      <div>{reply.commentor}</div>
                      <div>{reply.comment}</div>
                    </div>
                  )
                })}
              </div>
            )
          })} */

// let { threadId } = this.props.match.params //or let threadId = this.props.match.params.treadId
// let data = new FormData()
// data.append("threadId", threadId)
// fetch("http://localhost:4000/thread", {
//   method: "POST",
//   body: data,
//   credentials: "include"
// })
//   .then(x => {
//     return x.text()
//   })
//   .then(async responseBody => {
//     console.log("generating thread")
//     let body = JSON.parse(responseBody)
//     console.log("THREAD DATA", body)
//     let authorName = ""
//     let thread = []
//     let findauthor = () => {
//       let data = new FormData()
//       console.log(body.threadData.authorId)
//       data.append("authorId", body.threadData.authorId)
//       fetch("http://localhost:4000/authors", {
//         method: "POST",
//         body: data,
//         credentials: "include"
//       })
//         .then(x => {
//           return x.text()
//         })
//         .then(responseBody => {
//           console.log("finding author name")
//           let body = JSON.parse(responseBody)
//           console.log("AUTHOR", body)
//           return (authorName = body.userData.name)
//         })
//       console.log("AUTHOR NAME STRING", authorName)
//       return { ...thread, authorName }
//     }
//     thread = findauthor()
//     console.log("THREAD AFTER FIND AUTHOR", thread)
//     body.threadData.comments.map(comment => {
//       let commentorName = ""
//       let data = new FormData()
//       console.log("COMMENTOR ID", comment[0].commentor)
//       data.append("commentor", comment[0].commentor)
//       fetch("http://localhost:4000/commentor", {
//         method: "POST",
//         body: data,
//         credentials: "include"
//       })
//         .then(x => {
//           return x.text()
//         })
//         .then(responseBody => {
//           console.log("finding commentor name")
//           let body = JSON.parse(responseBody)
//           console.log("COMMENTOR", body)
//           return (commentorName = body.userData.name)
//         })
//       console.log(comment[1])
//       let firstComment = {}
//       comment[1].map(reply => {
//         let replierName = ""
//         let data = new FormData()
//         console.log("REPLIER ID", reply.commentor)
//         data.append("commentor", reply.commentor)
//         fetch("http://localhost:4000/commentor", {
//           method: "POST",
//           body: data,
//           credentials: "include"
//         })
//           .then(x => {
//             return x.text()
//           })
//           .then(responseBody => {
//             console.log("finding replier name")
//             let body = JSON.parse(responseBody)
//             console.log("REPLIER", body)
//             return (replierName = body.userData.name)
//           })
//         return { ...comment[0], commentorName }, { ...reply, replierName }
//       })
//       return comment[1]
//     })
//     this.setState(
//       {
//         threadArray: thread
//       },
//       () => console.log("THREAD STATE", this.state)
//     )
//   })
