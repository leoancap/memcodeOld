import React, { Component } from "react"
import PropTypes from "prop-types"
import isEmail from "validator/lib/isEmail"

import Input from "../Input"
import Button from "../Button"
import FormWrapper from "../styles/FormWrapper"

class LoginForm extends Component {
  static propTypes = {
    submit: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props)

    this.state = {
      data: {
        email: "",
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
      this.props.submit(this.state.data).catch(err => {
        console.log(err)
        this.setState({ errors: err.response.data.errors, loading: false })
      })
    }
  }

  validate = data => {
    const errors = {}
    if (!isEmail(data.email)) errors.email = "Invalid email"

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
          {errors.email && <h2> {errors.email} </h2>}
          <Button onClick={this.onSubmit}>Login</Button>
        </div>
      </FormWrapper>
    )
  }
}

export default LoginForm
