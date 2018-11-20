import mapKeys from "lodash/mapKeys"
import api from "../api"
import {
  FETCH_DECKS_BEGIN,
  FETCH_DECKS_FAILURE,
  FETCH_DECKS_SUCCESS,
  FETCH_DECKS_TO_REVIEW_SUCCESS,
} from "../types"

export const fetchDecksBegin = () => ({
  type: FETCH_DECKS_BEGIN,
})

export const fetchDecksSuccess = decks => ({
  type: FETCH_DECKS_SUCCESS,
  decks,
})

export const fetchDecksFailure = error => ({
  type: FETCH_DECKS_FAILURE,
  error,
})

export const fetchDecksToReviewSuccess = (decks, decksToReview) => ({
  type: FETCH_DECKS_TO_REVIEW_SUCCESS,
  payload: {
    decksToReview,
    decks,
  },
})

export const fetchDecks = language => dispatch => {
  dispatch(fetchDecksBegin())
  api.decks
    .fetchDecks(language)
    .then(decks => {
      dispatch(fetchDecksSuccess(mapKeys(decks, "_id")))
    })
    .catch(e => {
      dispatch(fetchDecksFailure(e))
    })
}

export const fetchDecksToReview = user => dispatch => {
  dispatch(fetchDecksBegin())
  api.decks
    .fetchDecksToReview(user)
    .then(({ decks, decksToReview }) => {
      dispatch(
        fetchDecksToReviewSuccess(
          mapKeys(decks, "_id"),
          mapKeys(decksToReview, "id"),
        ),
      )
    })
    .catch(err => {
      dispatch(fetchDecksFailure(err))
    })
}
export const addDeckBegin = (deck, uid) => () => {
  api.decks.addDeck(deck, uid).then(() => {})
}
