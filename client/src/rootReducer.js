// import { createStore, combineReducers, applyMiddleware, compose } from "redux"
// import thunk from "redux-thunk"
// import userReducer from "./reducers/user"

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// export default () => {
//   const store = createStore(
//     combineReducers({
//       user: userReducer,
//     }),
//     composeEnhancers(applyMiddleware(thunk)),
//   )

//   return store
// }

import { combineReducers } from "redux"

import user from "./reducers/user"
import decks from "./reducers/decks"
import deck from "./reducers/deck"
import workout from "./reducers/workout"

export default combineReducers({
  user,
  decks,
  deck,
  workout,
})
