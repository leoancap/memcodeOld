import {
  ON_NEXT_KATA,
  RUN_CODE_BEGIN,
  RUN_CODE_SUCCESS,
  RUN_CODE_FAILURE,
} from "../types"

const initialState = {
  loading: false,
  error: null,
  userResults: [],
  solutionResults: [],
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case RUN_CODE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case RUN_CODE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    case RUN_CODE_SUCCESS:
      return {
        loading: false,
        error: null,
        userResults: action.payload.userResults,
        solutionResults: action.payload.solutionResults,
      }
    case ON_NEXT_KATA:
      return initialState
    default:
      return state
  }
}
