import axios from "axios"

export default {
  user: {
    login: credentials =>
      axios.post("/api/auth", { credentials }).then(res => res.data.user),
    signup: user =>
      axios.post("/api/users", { user }).then(res => res.data.user),
    resetPasswordRequest: email =>
      axios.post("/api/auth/reset_password_request", { email }),
    validateToken: token => axios.post("/api/auth/validate_token", { token }),
    resetPassword: data => axios.post("/api/auth/reset_password", { data }),
    onStrengthen: (user, deckId, kataId, easiness) =>
      axios.post("/api/users/strengthen", { user, deckId, kataId, easiness }),
    removeKataFromReview: (user, deckId, kataId) =>
      axios.delete("/api/users/removeKataFromReview", {
        params: { user, deckId, kataId },
      }),
  },
  decks: {
    fetchDecks: language =>
      axios
        .get("api/decks", {
          params: {
            language,
          },
        })
        .then(res => res.data.decks),
    addDeck: (deck, uid) =>
      axios.post("api/decks/add", { deck, uid }).then(res => res.data),
    fetchDecksToReview: user =>
      axios
        .get("api/decks/decksToReview", {
          params: {
            user,
          },
        })
        .then(res => res.data),
  },
  katas: {
    fetchKatas: deck =>
      axios.get("api/decks/katas", { params: { deck } }).then(res => res.data),
    addKata: (deck, kata) =>
      axios.post("api/decks/katas/add", { deck, kata }).then(r => r.data),
    editKata: (deck, kata) =>
      axios.put("api/decks/katas/edit", { deck, kata }).then(r => r.data),
    fetchKatasToReview: (user, deck) =>
      axios
        .get("api/decks/katasToReview", { params: { user, deck } })
        .then(r => r.data),
    removeKata: (deck, kata) =>
      axios
        .delete("api/decks/katas/delete", { params: { deck, kata } })
        .then(r => r.data),
  },
  workout: {
    reasonToJs: (code, solution, tests) =>
      axios
        .post("api/workout", { code, solution, tests })
        .then(res => res.data)
        .catch(e => console.log(e)),
  },
}
