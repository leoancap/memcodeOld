import evalWorker from "eval-worker"

const validate = (katas, code, solution, currentKataId, tests, language) => {
  if (language === "javascript") {
    let bundledModules
    if (katas) {
      bundledModules = katas
        .filter(k => k.id !== currentKataId)
        .map(k => k.solution)
        .reduce((prev, next) => `${prev} ; ${next}`, "")
    } else {
      bundledModules = ""
    }

    tests.forEach(test => {
      evalWorker(`${bundledModules} ; ${code} ; ${test} `, 5000)
      evalWorker(`${bundledModules} ; ${solution} ; ${test} `, 5000)
    })
  }
}

export default validate
