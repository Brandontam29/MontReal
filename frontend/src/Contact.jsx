import React, { Component } from "react"
import { connect } from "react-redux"

class UnconnectedContact extends Component {
  render = () => {
    return (
      <div className="contact-container">
        <div className="contact-box">
          <div>this is the end of the page</div>
          <div>Web Designer: Brandon Tam</div>
          <div>Contact: Brandon.tam29@gmail.com</div>
          <div>
            My GitHub Link:{" "}
            <a
              href="https://www.github.com/Brandontam29/MontReal"
              rel="noopener noreferrer"
              target="_blank"
            >
              www.github.com/Brandontam29/MontReal
            </a>
          </div>
        </div>
      </div>
    )
  }
}
let Contact = connect()(UnconnectedContact)
export default Contact
