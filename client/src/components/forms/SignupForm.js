import React, { Component } from "react"
import PropTypes from "prop-types"
import isEmail from "validator/lib/isEmail"
// import InlineError from "../messages/InlineError"

import FormWrapper from "../styles/FormWrapper"
import Input from "../Input"
import Button from "../Button"

class SignupForm extends Component {
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
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value },
    })

  onSubmit = e => {
    e.preventDefault()
    const errors = this.validate(this.state.data)
    this.setState({ errors })
    if (Object.keys(errors).length === 0) {
      this.setState({ laoding: true })
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false }),
        )
    }
  }

  validate = data => {
    const errors = {}

    if (!isEmail(data.email)) {
      errors.email = "Invalid email"
    }
    if (!data.password) {
      errors.password = "Can't be blank"
    }

    return errors
  }

  render() {
    const { data, errors, loading } = this.state
    return (
      <div>
        {loading ? (
          <div>loading</div>
        ) : (
          <FormWrapper>
            <div>
              <h2>Email</h2>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="email@email.com"
                value={data.email}
                onChange={this.onChange}
              />
              {errors.email && <h2>{errors.email}</h2>}

              <h2>Password</h2>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="make it secure"
                value={data.password}
                onChange={this.onChange}
              />
              {errors.password && <h2>{errors.password} </h2>}
              <Button onClick={this.onSubmit}>signup</Button>
            </div>
          </FormWrapper>
        )}
      </div>
    )
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired,
}

export default SignupForm
