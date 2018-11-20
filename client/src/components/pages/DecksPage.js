import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import styled from "styled-components"
import { history } from "../../routes/AppRouter"

import MainWrapper from "../styles/MainWrapper"
import DeckForm from "../forms/DeckForm"
import DecksTabs from "../tabs/DecksTabs"
import Header from "../Header"
import ListDecks from "../lists/ListDecks"

import { fetchDecks } from "../../actions/decks"

class DecksPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      language: "Javascript",
      isAddingDeck: false,
      searchValue: "",
    }
  }

  componentDidMount = () => {
    this.props.fetchDecks(this.state.language)
  }

  onAddDeck = () => {
    this.setState(() => ({
      isAddingDeck: !this.state.isAddingDeck,
    }))
  }
  onSearchChange = e =>
    this.setState({ ...this.state, [e.target.name]: e.target.value })

  onSelectScheme = () => {
    this.setState(
      () => ({
        language: "Scheme",
      }),
      this.props.fetchDecks("scheme"),
    )
  }

  onSelectJavascript = () => {
    this.setState(
      () => ({
        language: "Javascript",
      }),
      this.props.fetchDecks("javascript"),
    )
  }

  onDeckClick = deckId => {
    history.push(`/deck/${deckId}`)
  }

  render() {
    const { isAddingDeck, language } = this.state
    const { loading, decks } = this.props
    return (
      <MainWrapper>
        <Header />
        {isAddingDeck ? (
          <DeckForm onAddDeck={this.onAddDeck} />
        ) : (
          <DecksPageStyled>
            <DecksTabs
              selected={language}
              onSelectScheme={this.onSelectScheme}
              onSelectJavascript={this.onSelectJavascript}
              onAddDeck={this.onAddDeck}
            />
            <Content isAddingDeck={isAddingDeck}>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <ListDecks decks={decks} onDeckClick={this.onDeckClick} />
              )}
            </Content>
          </DecksPageStyled>
        )}
      </MainWrapper>
    )
  }
}

const Content = styled.section`
  display: grid;
  grid-template-columns: 6fr;
`

const DecksPageStyled = styled.section`
  margin: 0 auto;
  padding-top: 5px;
  min-width: 80vw;
`

DecksPage.defaultProps = {
  decks: [],
}

DecksPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchDecks: PropTypes.func.isRequired,
  decks: PropTypes.shape({}),
}

const mapStateToProps = state => ({
  loading: state.decks.loading,
  error: state.decks.error,
  decks: state.decks.decks,
})

const mapDispatchToProps = dispatch => ({
  fetchDecks: language => dispatch(fetchDecks(language)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DecksPage)
