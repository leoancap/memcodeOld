import User from "../models/User"

export const pushToReview = async (user, kata, language, easiness) => {
  kata.nextInterval = 1
  kata.lastAttempt = Math.floor(new Date() / 8.64e7)
  kata.toReview = false
  kata.language = language

  const strengthenedKata = calcNextInterval(kata, easiness)

  await User.findOneAndUpdate(
    { _id: user },
    {
      $push: {
        katasSolved: strengthenedKata,
      },
    },
  )
}

export const checkFadingMemories = async user => {
  const { katasSolved } = await User.findById(user)

  const now = Math.round(new Date() / 8.64e7)

  for (const kata of katasSolved) {
    if (!kata.toReview && kata.lastAttempt + kata.nextInterval < now) {
      setToReview("javascript", user, kata)
    }
  }
}
export const removeFromReview = async (user, deck, kata, katas) => {
  console.log(katas)
  const katasWithoutKataToRemove = katas.filter(k => k.id !== kata)

  await User.update(
    { _id: user, "decksToReview.id": deck },
    {
      $set: {
        "decksToReview.$.katasToReview": katasWithoutKataToRemove,
      },
    },
  )
}

const getFib = n => {
  return n <= 1 ? 1 : getFib(n - 2) + getFib(n - 1)
}

export const strengthen = async (user, deck, kata, easiness, katas) => {
  const katasToStrengthen = katas.map(k => {
    const today = Math.floor(new Date() / 8.64e7)
    if (k.id === kata && k.lastAttempt + k.easiness <= today) {
      return {
        id: k.id,
        easiness: easiness === 0 ? 0 : getFib(k.easiness + easiness),
        lastAttempt: today,
      }
    } else {
      return k
    }
  })

  await User.update(
    { _id: user, "decksToReview.id": deck },
    {
      $set: {
        "decksToReview.$.katasToReview": katasToStrengthen,
      },
    },
  )
}

export const addKataToReview = async (user, deck, kata, easiness) => {
  const newKata = {
    id: kata,
    easiness,
    lastAttempt: Math.floor(new Date() / 8.64e7),
  }
  await User.update(
    {
      _id: user,
      "decksToReview.id": deck,
    },
    {
      $push: {
        "decksToReview.$.katasToReview": newKata,
      },
    },
  )
}

export const addDeckToReview = async (user, deck, kata, easiness) => {
  const newKata = {
    id: kata,
    easiness,
    lastAttempt: Math.floor(new Date() / 8.64e7),
  }
  const newDeck = {
    id: deck,
    katasToReview: [newKata],
  }
  await User.update(
    { _id: user },
    {
      $push: {
        decksToReview: newDeck,
      },
    },
  )
}
