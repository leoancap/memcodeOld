import decode from "jwt-decode"
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../types"
import setAuthorizationHeader from "../utils/setAuthorizationHeader"
import api from "../api"

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  user,
})

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
})

export const login = credentials => dispatch =>
  api.user.login(credentials).then(({ token }) => {
    const { _id } = decode(token)
    localStorage.memcodeJWT = token
    const user = {
      token,
      id: _id,
    }
    setAuthorizationHeader(token)
    dispatch(loginSuccess(user))
  })

export const logoutBegin = () => dispatch => {
  localStorage.removeItem("memcodeJWT")
  setAuthorizationHeader()
  dispatch(logoutSuccess())
}

export const resetPasswordRequest = ({ email }) => () =>
  api.user.resetPasswordRequest(email)

export const validateToken = token => () => api.user.validateToken(token)

export const resetPassword = data => () => api.user.resetPassword(data)
