import express from "express"
import mongoose from "mongoose"
import Deck from "../models/Deck"
import User from "../models/User"
import parseErrors from "../utils/parseErrors"
import { filterDecksToReview } from "../utils/filterKatas"

const router = express.Router()

router.get("/", (req, res) => {
  Deck.find({ language: req.query.language.toLowerCase() })
    .then(decks => {
      res.json({ decks })
    })
    .catch(e => res.status(400).json({ errors: parseErrors(e.errors) }))
})

router.post("/add", (req, res) => {
  const { deck } = req.body
  Deck.create({ ...deck })
    .then(() => res.status(200))
    .catch(e => res.status(400).json({ errors: parseErrors(e.errors) }))
})

router.put("/katas/edit", (req, res) => {
  const { deck, kata } = req.body

  Deck.update(
    { _id: deck, "katas.id": kata.id.toString() },
    {
      $set: {
        "katas.$.title": kata.title,
        "katas.$.description": kata.description,
        "katas.$.code": kata.code,
        "katas.$.solution": kata.solution,
        "katas.$.tests": kata.tests,
      },
    },
  )
    .then(() => {
      Deck.find({ _id: deck }).then(deck => {
        res.json({ deck })
      })
    })
    .catch(e => res.status(400).json({ errors: parseErrors(e.errors) }))
})

router.delete("/katas/delete", (req, res) => {
  const { deck, kata } = req.query
  Deck.findByIdAndUpdate(
    { _id: deck },
    { $pull: { katas: { id: kata } } },
  ).then(r => console.log(r))
})

router.post("/katas/add", (req, res) => {
  const { deck, kata } = req.body

  const id = new mongoose.Types.ObjectId()
  kata.id = id.toString()

  Deck.findOneAndUpdate(
    { _id: deck },
    {
      $push: {
        katas: kata,
      },
    },
  )
    .then(d => res.json({ d }))
    .catch(e => res.status(400).json({ errors: parseErrors(e.errors) }))
})

router.get("/katas", (req, res) => {
  const { deck } = req.query
  Deck.find({ _id: deck })
    .then(deck => {
      res.status(200).json({
        deck,
      })
    })
    .catch(e => res.status(400).json({ errors: parseErrors(e.errors) }))
})

router.get("/decksToReview", async (req, res) => {
  const user = req.query.user
  try {
    const { decksToReview } = await User.findById({ _id: user })
    const decksToReviewFiltered = filterDecksToReview(decksToReview)

    const decksIds = decksToReviewFiltered.map(de =>
      mongoose.Types.ObjectId(de.id),
    )
    const onlyDecksToReview = await Deck.find({
      _id: {
        $in: decksIds,
      },
    })
    res
      .status(200)
      .json({ decksToReview: decksToReviewFiltered, decks: onlyDecksToReview })
  } catch (error) {
    res.status(400).json({ errors: parseErrors(error.errors) })
  }
})

router.get("/katasToReview", async (req, res) => {
  const { user, deck } = req.query
  try {
    const { decksToReview } = await User.findById({ _id: user })
    const deckToReviewFiltered = filterDecksToReview(decksToReview).filter(
      d => d.id === deck,
    )

    const onlyDeckToReview = await Deck.find({
      _id: mongoose.Types.ObjectId(new mongoose.Types.ObjectId(deck)),
    })
    let katasToReview = []
    if (deckToReviewFiltered.length > 0) {
      katasToReview = deckToReviewFiltered[0].katasToReview
    }
    res.status(200).json({
      katasToReview: katasToReview,
      deck: onlyDeckToReview,
    })
  } catch (error) {
    res.status(404).json({ errors: "No Such Deck" })
  }
})

export default router
