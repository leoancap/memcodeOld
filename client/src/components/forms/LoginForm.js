import React, { Component } from "react"
import PropTypes from "prop-types"
import Validator from "validator"
import styled from "styled-components"
import InlineError from "../messages/InlineError"

import Input from "../Input"
import Button from "../Button"
import Form from "../styles/FormWrapper"

import { history } from "../../routes/AppRouter"

class LoginForm extends Component {
  static propTypes = {
    submit: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props)

    this.state = {
      data: {
        email: "",
        password: "",
      },
      loading: false,
      errors: {},
    }
  }

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    })

  onSubmit = e => {
    e.preventDefault()
    const errors = this.validate(this.state.data)
    this.setState({ errors })
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true })
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false }),
        )
    }
  }

  onSignup = () => {
    history.push("/signup")
  }

  onForgot = () => {
    history.push("/forgot")
  }

  validate = data => {
    const errors = {}
    if (!Validator.isEmail(data.email)) errors.email = "Invalid email"
    if (!data.password) errors.password = "Can't be blank"

    return errors
  }

  render() {
    const { data, errors, loading } = this.state

    if (loading) {
      return <div>loading</div>
    }

    return (
      <Form>
        <div>
          {errors.global && (
            <div>
              <h2>{errors.global}</h2>
            </div>
          )}
          <h2>Email</h2>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
          <h2>Password</h2>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
          <div />
          <Buttons>
            <div>
              <Button onClick={this.onSubmit}>Login</Button>
              <Button onClick={this.onForgot}>Forgot</Button>
            </div>
            <hr />

            <Button onClick={this.onSignup}>Signup</Button>
          </Buttons>
        </div>
      </Form>
    )
  }
}

const Buttons = styled.section`
  div {
    display: flex;
  }
  padding-top: 3rem;
  text-align: center;
`

export default LoginForm
