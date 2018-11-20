import express from "express"
var TimeoutPromise = require
const biwascheme = require("biwascheme")

const router = express.Router()

router.post("/", async (req, res) => {
  const code = req.body.code
  const solution = req.body.solution
  const tests = req.body.tests

  try {
    const userResults = await evalCode(code, tests)
    const solutionResults = await evalCode(solution, tests)
    res.json({
      userResults,
      solutionResults,
    })
  } catch (error) {
    if (error) {
      res.json({
        error: error,
      })
    } else {
      res.json({
        error: error,
      })
    }
  }
})

function evalCode(code, tests) {
  var et = setTimeout(() => {
    console.log("here")
  }, 2000)
  return new Promise((res, rej) => {
    try {
      const results = []
      tests.forEach(test => {
        const result = biwascheme.run(code + "\n" + test)
        results.push(result)
      })
      res(results)
    } catch (error) {
      rej(error)
    }
  })
}

export default router
