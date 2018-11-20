import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import PropTypes from "prop-types"

import Header from "../Header"
import ListDecks from "../lists/ListDecks"

import { fetchDecksToReview } from "../../actions/decks"
import { cleanDeckReducer } from "../../actions/deck"

import { history } from "../../routes/AppRouter"

import MainWrapper from "../styles/MainWrapper"

class ReviewPage extends React.Component {
  componentDidMount = () => {
    this.props.cleanDeckReducer()
    this.props.fetchDecksToReview(this.props.id)
  }

  onDeckClick = (deckId, kataId) => {
    history.push(`/bugs/${deckId}/${kataId}`)
  }

  render() {
    const { decks, decksToReview, loading, error } = this.props
    if (error) {
      return <div>{error}</div>
    }
    if (loading) {
      return <div>Loading...</div>
    }
    return (
      <MainWrapper>
        <Header />
        <ReviewPageStyled>
          <h2>Review</h2>
          <hr />

          <ListDecksStyled>
            <ListDecks
              decks={decks}
              onDeckClick={this.onDeckClick}
              decksToReview={decksToReview}
              isReview
            />
          </ListDecksStyled>
        </ReviewPageStyled>
      </MainWrapper>
    )
  }
}

const ListDecksStyled = styled.section`
  display: grid;
  grid-template-columns: 6fr;
`

const ReviewPageStyled = styled.section`
  margin: 0 auto;
  padding-top: 5px;
  min-width: 70vw;
`

const mapStateToProps = state => ({
  token: state.user.token,
  id: state.user.id,
  decks: state.decks.decks,
  decksToReview: state.decks.decksToReview,
  loading: state.decks.loading,
  error: state.decks.error,
})

const mapDispatchToProps = dispatch => ({
  fetchDecksToReview: user => dispatch(fetchDecksToReview(user)),
  cleanDeckReducer: () => dispatch(cleanDeckReducer()),
})

ReviewPage.propTypes = {
  id: PropTypes.number.isRequired,
  cleanDeckReducer: PropTypes.func.isRequired,
  fetchDecksToReview: PropTypes.func.isRequired,
  decks: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  decksToReview: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReviewPage)
