import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  DISABLE_VIM,
  ENABLE_VIM,
} from "../types"

const initialState = {
  token: null,
  id: "",
  vim: false,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.user,
      }
    case LOGOUT_SUCCESS:
      return {}
    case ENABLE_VIM:
      return {
        ...state,
        vim: true,
      }
    case DISABLE_VIM:
      return {
        ...state,
        vim: false,
      }
    default:
      return state
  }
}
