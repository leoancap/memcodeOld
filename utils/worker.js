module.exports = function evalScheme(code) {
  const ct = `
(define (f n)
        (if (< n 1)
                1
                (* n (f (- n 0.0001) ))
        ))
(f 5.3)
`
  const biwascheme = require("biwascheme")

  return biwascheme.run(ct)
}
