import { transform } from "babel-standalone"
import evalWorker from "eval-worker"
import {
  RUN_CODE_BEGIN,
  RUN_CODE_SUCCESS,
  RUN_CODE_FAILURE,
  ON_NEXT_KATA,
} from "../types"
import api from "../api"

export const runCodeBegin = () => ({
  type: RUN_CODE_BEGIN,
})

export const runCodeFailure = error => ({
  type: RUN_CODE_FAILURE,
  payload: {
    error,
  },
})

export const runCodeSuccess = (userResults, solutionResults) => ({
  type: RUN_CODE_SUCCESS,
  payload: {
    userResults,
    solutionResults,
  },
})

export const onNextKata = () => ({
  type: ON_NEXT_KATA,
})

export const onStrengthen = (uid, deckId, kataId, easiness) => () => {
  api.user.onStrengthen(uid, deckId, kataId, easiness)
}

export const removeKataFromReview = (uid, deckId, kataId) => () => {
  api.user.removeKataFromReview(uid, deckId, kataId)
}

export const runCode = (
  code,
  solution,
  tests,
  language,
  bundledModules,
) => dispatch => {
  dispatch(runCodeBegin())
  if (language === "reasonml") {
    api.workout
      .reasonToJs(
        `${bundledModules} \n ${code}`,
        `${bundledModules} \n ${solution}`,
        tests,
      )
      .then(res => {
        console.log(res)
        if (res.error) {
          dispatch(runCodeFailure(res.error))
        } else {
          dispatch(runCodeSuccess(res.userResults, res.solutionResults))
        }
      })
      .catch(e => console.log(e))
  } else if (language === "javascript") {
    const userResults = []
    const solutionResults = []

    tests.forEach(async test => {
      try {
        const userResult = await evalWorker(
          `${bundledModules} ; ${
            transform(code, { presets: ["es2015"] }).code
          } \n ${test}`,
          2000,
        )
        const solutionResult = await evalWorker(
          `${bundledModules} ; ${
            transform(solution, { presets: ["es2015"] }).code
          } \n ${test}`,
          2000,
        )
        userResults.push(userResult)
        solutionResults.push(solutionResult)

        dispatch(runCodeSuccess(userResults, solutionResults))
      } catch (error) {
        dispatch(runCodeFailure(error))
      }
    })
  }
}
