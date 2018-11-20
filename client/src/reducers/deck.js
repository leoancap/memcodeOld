import {
  FETCH_KATAS_BEGIN,
  FETCH_KATAS_SUCCESS,
  FETCH_KATAS_FAILURE,
  CLEAN_DECK_REDUCER,
  FETCH_KATAS_TO_REVIEW_SUCCESS,
} from "../types"

const deckInitialState = {
  loading: false,
  error: null,
  katas: [],
}
export default (state = deckInitialState, action = {}) => {
  switch (action.type) {
    case FETCH_KATAS_BEGIN:
      return {
        loading: true,
      }
    case CLEAN_DECK_REDUCER:
      return deckInitialState
    case FETCH_KATAS_FAILURE:
      return {
        loading: false,
        error: action.payload.error,
      }
    case FETCH_KATAS_SUCCESS:
      return {
        error: null,
        loading: false,
        ...action.payload.deck[0],
      }
    case FETCH_KATAS_TO_REVIEW_SUCCESS:
      return {
        loading: false,
        error: null,
        ...action.payload.deck[0],
        katasToReview: action.payload.katasToReview,
      }
    default:
      return state
  }
}
