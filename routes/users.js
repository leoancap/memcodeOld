import express from "express"
import User from "../models/User"
import parseErrors from "../utils/parseErrors"
import {
  strengthen,
  addDeckToReview,
  addKataToReview,
} from "../utils/strengthen"

const router = express.Router()

router.post("/", (req, res) => {
  const { email, password } = req.body.user
  const newUser = new User({ email })
  newUser.setPassword(password)
  newUser
    .save()
    .then(user => res.json({ user: newUser.toAuthJSON() }))
    .catch(err => {
      res.status(400).json({ errors: parseErrors(err.errors) })
    })
})

router.post("/strengthen", async (req, res) => {
  const { user, deckId, kataId, easiness } = req.body
  try {
    const { decksToReview } = await User.findById({ _id: user })
    const deckInDB = decksToReview.filter(d => d.id === deckId)
    if (deckInDB.length > 0) {
      const kataInDB = deckInDB[0].katasToReview.filter(k => k.id === kataId)
      if (kataInDB.length > 0) {
        strengthen(user, deckId, kataId, easiness, deckInDB[0].katasToReview)
      } else {
        addKataToReview(user, deckId, kataId, easiness)
      }
    } else {
      addDeckToReview(user, deckId, kataId, easiness)
    }
  } catch (error) {
    res.status(400).json({ errors: parseErrors(err.errors) })
  }
  res.status(200).json({})
})

export default router
