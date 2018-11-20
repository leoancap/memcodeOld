import jwt from "jsonwebtoken"

export default (req, res, next) => {
  const header = req.headers.authoriztion
  let token
  if (header) token = header.split(" ")[1]
  if (token) {
    jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
      if (err) {
        res.status(401).json({
          errors: {
            global: "Invalid token",
          },
        })
      } else {
        next()
      }
    })
  } else {
    res.status(401).json({
      errors: {
        global: "No token",
      },
    })
  }
}
