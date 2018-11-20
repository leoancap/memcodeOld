import React from "react"
import PropTypes from "prop-types"
import KatasTabStyled from "../styles/KatasTabStyled"

import Button from "../Button"

const DecksTabs = ({ creator, uid, deckTitle, onAddDeck }) => (
  <KatasTabStyled>
    <div>{deckTitle}</div>
    {uid.length > 0 && creator === uid ? (
      <Button small onClick={onAddDeck}>
        Add Deck
      </Button>
    ) : (
      <div />
    )}
  </KatasTabStyled>
)

DecksTabs.propTypes = {
  creator: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  onAddDeck: PropTypes.func.isRequired,
  deckTitle: PropTypes.string.isRequired,
}

export default DecksTabs
