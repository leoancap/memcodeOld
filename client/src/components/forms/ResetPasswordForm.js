import React, { Component } from "react"
import PropTypes from "prop-types"

import Input from "../Input"
import Button from "../Button"
import FormWrapper from "../styles/FormWrapper"

class ResetPasswordForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        token: this.props.token,
        password: "",
        passwordConfirmation: "",
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
      console.log("hwer2")
      this.setState({ loading: true })
      this.props.submit(this.state.data).catch(err => {
        console.log(err)
        this.setState({ errors: err.response.data.errors, loading: false })
      })
    }
  }

  validate = data => {
    const errors = {}
    if (!data.password) errors.password = "Can't be blank"
    if (data.password !== data.passwordConfirmation)
      errors.password = "Passwords must match"

    return errors
  }

  render() {
    const { data, errors, loading } = this.state

    if (loading) {
      return <div>loading</div>
    }

    return (
      <FormWrapper>
        <div>
          {!!errors.global && (
            <div>
              <p>{errors.global}</p>
            </div>
          )}
          <h2 htmlFor="password">You new password</h2>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="your new password"
            value={data.password}
            onChange={this.onChange}
          />
          <h2 htmlFor="passwordConfirmation">Confirm your new password</h2>
          <Input
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            placeholder="type it again, please"
            value={data.passwordConfirmation}
            onChange={this.onChange}
          />
          {errors.password && <h2>{errors.passwordConfirmation}</h2>}
          <Button onClick={this.onSubmit}>Login</Button>
        </div>
      </FormWrapper>
    )
  }
}

ResetPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
}

export default ResetPasswordForm
