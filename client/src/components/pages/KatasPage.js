import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types"
import styled from "styled-components"

import Header from "../Header"
import KataForm from "../forms/KataForm"
import ListKatas from "../lists/ListKatas"
import KatasTab from "../tabs/KatasTab"

import { fetchKatas } from "../../actions/deck"

import MainWrapper from "../styles/MainWrapper"

class KatasPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isAddingKata: false,
    }
  }

  componentWillMount = () => {
    const { deck } = this.props.match.params
    this.props.fetchKatas(deck)

    if (this.props.location.state) {
      if (this.props.location.state.isAddingKata) {
        this.setState({ isAddingKata: true })
        this.props.history.replace({
          pathname: this.props.location.pathname,
          state: {},
        })
      }
    }
  }

  onAddKata = () => {
    if (this.state.isAddingKata) {
      const { deck } = this.props.match.params
      this.props.fetchKatas(deck)
    }
    this.setState(() => ({
      isAddingKata: !this.state.isAddingKata,
    }))
  }

  render() {
    const { isAddingKata } = this.state
    const { deckTitle, katas, loading, creator, uid } = this.props
    const { deck: deckID } = this.props.match.params

    return (
      <MainWrapper>
        <Header />
        {isAddingKata ? (
          <KataForm onAddKata={this.onAddKata} />
        ) : (
          <div>
            {loading ? (
              <div>loading...</div>
            ) : (
              <div>
                <KatasTab
                  deckTitle={deckTitle}
                  creator={creator}
                  uid={uid}
                  onAddDeck={this.onAddKata}
                />

                <Content>
                  <ListKatas deckID={deckID} katas={katas} />
                </Content>
              </div>
            )}
          </div>
        )}
      </MainWrapper>
    )
  }
}

const Content = styled.section`
  display: grid;
  grid-template-columns: 6fr;
`

KatasPage.defaultProps = {
  uid: "",
  // token: "",
  katas: [],
  creator: "",
}

KatasPage.propTypes = {
  uid: PropTypes.string,
  katas: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
  creator: PropTypes.string,
  deckTitle: PropTypes.string.isRequired,
  fetchKatas: PropTypes.func.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
    pathname: PropTypes.string,
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      isAddingKata: PropTypes.func,
    }),
    pathname: PropTypes.string,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      deck: PropTypes.string,
    }),
  }).isRequired,
}

const mapStateToProps = state => ({
  token: state.user.token,
  uid: state.user.id,
  katas: state.deck.katas,
  creator: state.deck.creator,
  deckTitle: state.deck.title,
  error: state.deck.error,
  loading: state.deck.loading,
})

const mapDispatchToProps = dispatch => ({
  fetchKatas: deck => dispatch(fetchKatas(deck)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(KatasPage),
)
