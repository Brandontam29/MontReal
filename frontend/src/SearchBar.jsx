import { connect } from "react-redux"
import React, { Component } from "react"

class UnconnectedSearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ""
    }
  }

  handleSearchChange = event => {
    this.setState({
      query: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.dispatch({
      type: "searchQuery",
      query: this.state.query
    })
  }

  render = () => {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="searchbar-flex">
            <input
              className="search-bar"
              onChange={this.handleSearchChange}
              type="text"
              placeholder="Search"
            />
            <img
              className="search-icon"
              src="http://localhost:4000/images/search_icon.png"
              onClick={this.handleSubmit}
            />
          </div>
        </form>
      </div>
    )
  }
}
let SearchBar = connect()(UnconnectedSearchBar)
export default SearchBar
