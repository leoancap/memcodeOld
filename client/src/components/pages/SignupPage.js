import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import SignupForm from "../forms/SignupForm"
import { signup } from "../../actions/users"

import MainWrapper from "../styles/MainWrapper"
import Header from "../Header"

class SignupPage extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    signup: PropTypes.func.isRequired,
  }

  submit = data =>
    this.props.signup(data).then(() => this.props.history.push("/decks"))

  render() {
    return (
      <MainWrapper>
        <Header />

        <div>
          <SignupForm submit={this.submit} />
        </div>
      </MainWrapper>
    )
  }
}

// const mapStateToProps = state => ({})

const mapDispatchToProps = {
  signup,
}

export default connect(
  null,
  // mapStateToProps,
  mapDispatchToProps,
)(SignupPage)
