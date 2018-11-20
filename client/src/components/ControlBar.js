import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { withRouter, Link } from "react-router-dom"

// import { Popup, Message } from "semantic-ui-react"
import Popup from "reactjs-popup"

import runIcon from "../assets/icons/play-solid.svg"
import vimIcon from "../assets/icons/vim_icon.svg"

import { toggleVim } from "../actions/users"

import {
  popupArrowStyle,
  popupStyle,
  ControlBarStyled,
  ButtonStyled,
} from "./styles/ControlBarStyled"

class ControlBar extends Component {
  state = {
    popoverOpen: false,
  }

  onTogglePopover = () => {
    this.setState(({ open }) => ({ open: !open }))
  }

  hasPrev = currentKataIndex => {
    if (currentKataIndex - 1 >= 0) {
      return false
    }
    return true
  }
  hasNext = (katas, currentKataIndex) => {
    if (currentKataIndex + 1 < katas.length) {
      return false
    }
    return true
  }

  render() {
    const {
      katas,
      katasToReview,
      deckTitle,
      kataId,
      deckId,
      showDescription,
      showSolution,
      onNext,
      onRunCode,
      toggleVim,
      isEditable,
      onToggleEditKata,
      isReview,
    } = this.props

    let katasFiltered
    if (isReview) {
      katasFiltered = katas.filter(
        el => katasToReview.filter(el2 => el.id === el2.id).length !== 0,
      )
    } else {
      katasFiltered = katas
    }

    const ind = katasFiltered.findIndex(k => k.id === kataId)

    return (
      <ControlBarStyled>
        <div>
          <ButtonStyled onClick={onRunCode}>
            <img src={runIcon} alt="run" />
            <span>Run</span>
          </ButtonStyled>
          <ButtonStyled
            disabled={this.hasPrev(ind)}
            onClick={() => onNext(katasFiltered[ind - 1].id)}
          >
            &lt; <span> Prev</span>
          </ButtonStyled>
          <ButtonStyled
            disabled={this.hasNext(katasFiltered, ind)}
            onClick={() => onNext(katasFiltered[ind + 1].id)}
          >
            &gt; <span> Next</span>
          </ButtonStyled>
          <Popup
            trigger={
              <ButtonStyled>
                <span>
                  <Link to={`/deck/${deckId}`}>{deckTitle}</Link>
                </span>
              </ButtonStyled>
            }
            arrowStyle={popupArrowStyle}
            contentStyle={popupStyle}
            position="bottom center"
            on="click"
          >
            <ul>
              {katas.map((k, i) => (
                <li key={k.title}>
                  <ButtonStyled onClick={() => onNext(i)}>
                    <span>{k.title}</span>
                  </ButtonStyled>
                </li>
              ))}
            </ul>
          </Popup>
          <ButtonStyled vim onClick={toggleVim}>
            <img src={vimIcon} alt="vim" />
          </ButtonStyled>
        </div>
        <div>
          {isEditable && (
            <ButtonStyled>
              <span>
                <Link
                  to={{
                    pathname: `/deck/${deckId}`,
                    state: {
                      isAddingKata: true,
                    },
                  }}
                >
                  Add
                </Link>
              </span>
            </ButtonStyled>
          )}
          {isEditable && (
            <ButtonStyled onClick={onToggleEditKata}>
              <span>Edit</span>
            </ButtonStyled>
          )}
          <ButtonStyled onClick={showDescription}>
            <span>Description</span>
          </ButtonStyled>
          <ButtonStyled onClick={showSolution}>
            <span>Solution</span>
          </ButtonStyled>
        </div>
      </ControlBarStyled>
    )
  }
}

const mapStateToProps = state => ({
  vim: state.user.vim,
})

ControlBar.defaultProps = {
  katas: [],
  katasToReview: [],
  isReview: false,
}

ControlBar.propTypes = {
  katas: PropTypes.arrayOf(PropTypes.object),
  katasToReview: PropTypes.arrayOf(PropTypes.object),
  deckTitle: PropTypes.string.isRequired,
  isReview: PropTypes.bool,
  kataId: PropTypes.string.isRequired,
  deckId: PropTypes.string.isRequired,
  showDescription: PropTypes.func.isRequired,
  showSolution: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onRunCode: PropTypes.func.isRequired,
  toggleVim: PropTypes.func.isRequired,
  onToggleEditKata: PropTypes.func.isRequired,
  isEditable: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default withRouter(
  connect(
    mapStateToProps,
    { toggleVim },
  )(ControlBar),
)
