import {
  FETCH_DECKS_BEGIN,
  FETCH_DECKS_SUCCESS,
  FETCH_DECKS_FAILURE,
  FETCH_DECKS_TO_REVIEW_SUCCESS,
} from "../types"

const decksInitialState = {
  loading: false,
  error: null,
  decks: [],
}
export default (state = decksInitialState, action = {}) => {
  switch (action.type) {
    case FETCH_DECKS_BEGIN:
      return {
        loading: true,
      }
    case FETCH_DECKS_FAILURE:
      return {
        loading: false,
        error: action.error,
      }
    case FETCH_DECKS_SUCCESS:
      return {
        ...state,
        decks: { ...action.decks },
        loading: false,
        error: null,
      }
    case FETCH_DECKS_TO_REVIEW_SUCCESS:
      return {
        decksToReview: { ...action.payload.decksToReview },
        decks: { ...action.payload.decks },
        loading: false,
        error: null,
      }
    default:
      return state
  }
}
