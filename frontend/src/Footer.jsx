import React, { Component } from "react"
import { connect } from "react-redux"

class UnconnectedFooter extends Component {
  render = () => {
    return (
      <div className="footer-container">
        <hr className="footer-line" />
        <div className="footer-box">
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
let Footer = connect()(UnconnectedFooter)
export default Footer
