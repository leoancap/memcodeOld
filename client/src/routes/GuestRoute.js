import React from "react"
import PropTypes from "prop-types"
import { Route } from "react-router-dom"

const GuestRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => <Component {...props} />} />
)

GuestRoute.propTypes = {
  component: PropTypes.func.isRequired,
}

export default GuestRoute
