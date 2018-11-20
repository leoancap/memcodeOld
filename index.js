import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import Promise from "bluebird"
import path from "path"

import auth from "./routes/auth"
import users from "./routes/users"
import decks from "./routes/decks"
import workout from "./routes/workout"

dotenv.config()
let app = express()
app.use(bodyParser.json())
mongoose.promise = Promise
mongoose.connect(
  process.env.MONGODB_URL,
  { useNewUrlParser: true },
)

app.use("/api/auth", auth)
app.use("/api/users", users)

app.use("/api/decks", decks)
app.use("/*/api/decks", decks)

app.use("/*/api/workout", workout)

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
})

let PORT = process.env.PORT || 8080
app.listen(PORT)
