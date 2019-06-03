import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

class UnconnectedOtherAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      otherAccount: []
    }
  }

  componentDidMount = () => {
    let { userId } = this.props.match.params //or let OtherAccountId = this.props.match.params.treadId
    let data = new FormData()
    data.append("userId", userId)
    fetch("http://localhost:4000/otheraccount", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(x => {
        return x.text()
      })
      .then(responseBody => {
        let body = JSON.parse(responseBody)
        console.log(responseBody)
        console.log(body)
        this.setState(
          {
            otherAccount: body.otherAccountData
          },
          () => console.log(this.state.otherAccount)
        )
      })
  }

  render = () => {
    //return <div>helo</div>
    let { otherAccount } = this.state
    let otherAccountPic = "http://localhost:4000/images" + otherAccount.pic
    return (
      <div className="profile-container">
        <img className="profile-pic" src={otherAccountPic} />
        <h3>{otherAccount.name}</h3>
        <div>{otherAccount.bio}</div>
        <div>{otherAccount.description}</div>
      </div>
    )
  }
}

let OtherAccount = connect()(UnconnectedOtherAccount)

export default OtherAccount
