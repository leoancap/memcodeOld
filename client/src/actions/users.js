import decode from "jwt-decode"
import api from "../api"
import { ENABLE_VIM, DISABLE_VIM } from "../types"
import { loginSuccess } from "./auth"
import setAuthorizationHeader from "../utils/setAuthorizationHeader"

export const signup = data => dispatch =>
  api.user.signup(data).then(({ token }) => {
    localStorage.memcodeJWT = token
    const { _id } = decode(token)
    const user = {
      token,
      id: _id,
    }
    setAuthorizationHeader(token)
    dispatch(loginSuccess(user))
  })

export const enableVim = () => {
  localStorage.vim = true
  return {
    type: ENABLE_VIM,
  }
}

export const disableVim = () => {
  localStorage.removeItem("vim")
  return {
    type: DISABLE_VIM,
  }
}

export const toggleVim = () => dispatch => {
  if (localStorage.vim) {
    dispatch(disableVim())
  } else {
    dispatch(enableVim())
  }
}
