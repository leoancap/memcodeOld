import api from "../api"
import {
  FETCH_KATAS_BEGIN,
  FETCH_KATAS_FAILURE,
  FETCH_KATAS_SUCCESS,
  FETCH_KATAS_TO_REVIEW_SUCCESS,
  CLEAN_DECK_REDUCER,
} from "../types"

export const fetchKatasBegin = () => ({
  type: FETCH_KATAS_BEGIN,
})
export const fetchKatasSuccess = deck => ({
  type: FETCH_KATAS_SUCCESS,
  payload: {
    deck,
  },
})

export const fetchKatasFailure = error => ({
  type: FETCH_KATAS_FAILURE,
  payload: {
    error,
  },
})

export const cleanDeckReducer = () => ({
  type: CLEAN_DECK_REDUCER,
})

export const fetchKatasToReviewBegin = () => ({
  type: FETCH_KATAS_BEGIN,
})

export const fetchKatasToReviewSuccess = (deck, katasToReview) => ({
  type: FETCH_KATAS_TO_REVIEW_SUCCESS,
  payload: {
    deck,
    katasToReview,
  },
})

export const fetchKatasToReviewFailure = error => ({
  type: FETCH_KATAS_FAILURE,
  payload: {
    error,
  },
})

export const fetchKatas = deck => dispatch => {
  dispatch(fetchKatasBegin())
  api.katas
    .fetchKatas(deck)
    .then(d => {
      dispatch(fetchKatasSuccess(d.deck))
    })
    .catch(e => {
      dispatch(fetchKatasFailure(e))
    })
}

export const fetchKatasToReview = (user, deck) => dispatch => {
  dispatch(fetchKatasBegin())
  api.katas
    .fetchKatasToReview(user, deck)
    .then(res => {
      dispatch(fetchKatasToReviewSuccess(res.deck, res.katasToReview))
    })
    .catch(e => {
      dispatch(fetchKatasFailure(e))
    })
}

export const addKataBegin = (deck, kata) => () => {
  api.katas.addKata(deck, kata).then(() => {})
}

export const editKataBegin = (deck, kata) => dispatch => {
  api.katas.editKata(deck, kata).then(d => {
    dispatch(fetchKatasSuccess(d))
  })
}

export const removeKataBegin = (deck, kata) => () => {
  api.katas.removeKata(deck, kata).then(() => {})
}
