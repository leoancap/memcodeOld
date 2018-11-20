import React from "react"
import { Router, Switch } from "react-router-dom"
import createHistory from "history/createBrowserHistory"

import LoginPage from "../components/pages/LoginPage"
import SignupPage from "../components/pages/SignupPage"
import DashboardPage from "../components/pages/DashboardPage"
import DecksPage from "../components/pages/DecksPage"
import KatasPage from "../components/pages/KatasPage"
import ReviewPage from "../components/pages/ReviewPage"
import WorkoutPage from "../components/pages/WorkspacePage"
import ForgotPasswordPage from "../components/pages/ForgotPasswordPage"
import ResetPasswordPage from "../components/pages/ResetPasswordPage"

import UserRoute from "./UserRoute"
import GuestRoute from "./GuestRoute"

export const history = createHistory()

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <GuestRoute path="/login" component={LoginPage} exact />
      <GuestRoute path="/signup" component={SignupPage} exact />
      <GuestRoute path="/forgot" component={ForgotPasswordPage} exact />
      <GuestRoute
        path="/reset_password/:token"
        component={ResetPasswordPage}
        exact
      />
      <UserRoute path="/dashboard" component={DashboardPage} exact />
      <GuestRoute path="/decks" component={DecksPage} exact />
      <GuestRoute path="/deck/:deck" component={KatasPage} exact />
      <UserRoute path="/bugs" component={ReviewPage} exact />
      <UserRoute path="/bugs/:deck/:kata" component={WorkoutPage} exact />
      <GuestRoute path="/deck/:deck/:kata" component={WorkoutPage} exact />
      <GuestRoute component={LoginPage} />
    </Switch>
  </Router>
)

export default AppRouter
