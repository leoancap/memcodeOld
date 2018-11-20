import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route } from "react-router-dom"
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { Provider } from "react-redux"
import { composeWithDevTools } from "redux-devtools-extension"
import decode from "jwt-decode"

import App from "./App"
import registerServiceWorker from "./registerServiceWorker"
import rootReducer from "./rootReducer"
import { loginSuccess } from "./actions/auth"
import { enableVim } from "./actions/users"
import setAuthorizationHeader from "./utils/setAuthorizationHeader"

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
)

if (localStorage.memcodeJWT) {
  const payload = decode(localStorage.memcodeJWT)
  const user = {
    token: localStorage.memcodeJWT,
    id: payload._id,
  }
  setAuthorizationHeader(localStorage.memcodeJWT)
  store.dispatch(loginSuccess(user))
}
if (localStorage.vim) {
  store.dispatch(enableVim())
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root"),
)
registerServiceWorker()
