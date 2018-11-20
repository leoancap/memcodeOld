import _ from "lodash"

export const filterDecksToReview = decksToReview => {
  const decksToReviewFiltered = decksToReview.map(deck => {
    const katasFiltered = deck.katasToReview.filter(kata => {
      const today = Math.floor(new Date() / 8.64e7)
      return kata.easiness + kata.lastAttempt <= today
    })
    return {
      id: deck.id,
      katasToReview: katasFiltered,
    }
  })
  return decksToReviewFiltered.filter(d => d.katasToReview.length > 0)
}
