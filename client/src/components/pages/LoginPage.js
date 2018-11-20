import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Redirect } from "react-router-dom"

import LoginForm from "../forms/LoginForm"
import { login } from "../../actions/auth"

import MainWrapper from "../styles/MainWrapper"
import Header from "../Header"

class LoginPage extends React.Component {
  componentDidMount = () => {}

  submit = data =>
    this.props.login(data).then(() => this.props.history.push("/decks"))

  render() {
    const { isAuthenticated } = this.props
    return (
      <MainWrapper>
        <Header />

        <div>
          {isAuthenticated ? (
            <Redirect to="/decks" />
          ) : (
            <LoginForm submit={this.submit} />
          )}
        </div>
      </MainWrapper>
    )
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired,
  }).isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: !!state.user.token,
})

const mapDispatchToProps = {
  login,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage)
