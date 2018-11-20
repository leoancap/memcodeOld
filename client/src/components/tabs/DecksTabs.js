import React from "react"
import PropTypes from "prop-types"
import DecksTabsStyled from "../styles/DecksTabsStyled"

import JsIcon from "../../assets/icons/js-icon.png"
import SchemeIcon from "../../assets/icons/scheme-icon.svg"

import Button from "../Button"

const DecksTabs = ({
  onSelectScheme,
  selected,
  onSelectJavascript,
  onAddDeck,
}) => (
  <DecksTabsStyled language={selected}>
    <div>
      <img src={JsIcon} alt="" />
      <Button transparent onClick={onSelectJavascript}>
        Javascript
      </Button>
      <img src={SchemeIcon} alt="" />
      <Button transparent onClick={onSelectScheme}>
        Scheme
      </Button>
    </div>
    <div>
      <div />
      {onAddDeck ? (
        <Button small onClick={onAddDeck}>
          Add Deck
        </Button>
      ) : (
        <div />
      )}
    </div>
  </DecksTabsStyled>
)

DecksTabs.propTypes = {
  onSelectScheme: PropTypes.func.isRequired,
  onSelectJavascript: PropTypes.func.isRequired,
  onAddDeck: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
}

export default DecksTabs
