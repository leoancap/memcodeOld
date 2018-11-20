import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { resetPasswordRequest } from "../../actions/auth"

import MainWrapper from "../styles/MainWrapper"
import Header from "../Header"

import ForgotPasswordForm from "../forms/ForgotPasswordForm"

class ForgotPasswordPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      success: false,
    }
  }

  submit = data =>
    this.props
      .resetPasswordRequest(data)
      .then(() => this.setState({ success: true }))

  render() {
    return (
      <MainWrapper>
        <Header />

        <div>
          {this.state.success ? (
            <h2>Email has been sent.</h2>
          ) : (
            <ForgotPasswordForm submit={this.submit} />
          )}
        </div>
      </MainWrapper>
    )
  }
}

ForgotPasswordPage.propTypes = {
  resetPasswordRequest: PropTypes.func.isRequired,
}

export default connect(
  null,
  { resetPasswordRequest },
)(ForgotPasswordPage)
