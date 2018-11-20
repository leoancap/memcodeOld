import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import SplitPane from "react-split-pane"
import { Redirect } from "react-router-dom"

import ControlBar from "../ControlBar"
import Header from "../Header"
import Editor from "../Editor"
import KataDetails from "../KataDetails"
import ListResults from "../lists/ListResults"
import KataForm from "../forms/KataForm"

import { history } from "../../routes/AppRouter"

import { fetchKatas, fetchKatasToReview } from "../../actions/deck"
import { onNextKata, runCode, onStrengthen } from "../../actions/workout"
import { toggleVim } from "../../actions/users"

import MainWrapper from "../styles/MainWrapper"
import WorkspaceWrapper from "../styles/WorkspaceWrapper"
import LeftPaneWrapper from "../styles/LeftPaneWrapper"

import ReviewButtons from "../styles/StrengthenWrapper"

import beautify from "../../utils/beautify"

class WorkspacePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isReviewing: false,
      kataLoaded: false,
      strengthened: false,
      run: false,
      userCode: this.props.code,
      onLeftPane: "description",
      isEditing: false,
    }
  }

  componentDidMount = () => {
    const { uid } = this.props
    if (this.props.match.path.includes("bugs")) {
      this.setState({ isReviewing: true })
      this.props.fetchKatasToReview(uid, this.props.match.params.deck)
    } else {
      this.props.fetchKatas(this.props.match.params.deck)
    }
  }

  static getDerivedStateFromProps({ katas, match }, { kataLoaded }) {
    if (Array.isArray(katas) && katas.length > 0 && !kataLoaded) {
      const { kata } = match.params
      const ind = katas.findIndex(k => k.id === kata)
      if (ind < 0) {
        return {
          kataLoaded: true,
          userCode: "",
        }
      }
      return {
        kataLoaded: true,
        userCode: katas[ind].code,
      }
    }
    return null
  }
  onReview = easiness => {
    const { strengthened } = this.state
    if (!strengthened) {
      const kataId = this.props.match.params.kata
      const deckId = this.props.match.params.deck

      if (!this.props.uid) history.push("/login")

      this.setState({
        strengthened: true,
      })
      this.props.onStrengthen(this.props.uid, deckId, kataId, easiness)
    }
  }

  onRunCode = () => {
    const { katas, runCode } = this.props
    const kataId = this.props.match.params.kata
    const ind = katas.findIndex(k => k.id === kataId)
    const tests = katas[ind].tests
    const solution = katas[ind].solution
    const language = katas[ind].language

    let bundledModules = ""
    if (katas.length > 1 && language === "javascript") {
      const kf = katas.filter(k => k.id !== kataId)
      const solutions = kf.map(k => k.solution)
      bundledModules = solutions.reduce((prev, next) => `${prev}  ; ${next}`)
    } else if (katas.length > 1 && language === "reasonml") {
      bundledModules = katas
        .filter(k => k.id !== kataId)
        .map(k => k.solution)
        .reduce((prev, next) => `${prev}  \n\n ${next}`)
    }

    const { userCode } = this.state
    this.setState({
      onLeftPane: "results",
      run: true,
    })
    runCode(userCode, solution, tests, language, bundledModules)
  }

  onNext = nextKata => {
    const { onNextKata } = this.props
    const deck = this.props.match.params.deck
    onNextKata()

    this.setState({
      kataLoaded: false,
      strengthened: false,
      run: false,
      onLeftPane: "description",
    })

    if (this.state.isReviewing) {
      history.push(`/bugs/${deck}/${nextKata}`)
    } else {
      history.push(`/deck/${deck}/${nextKata}`)
    }
  }

  onToggleEditKata = () => {
    this.setState(({ isEditing }) => ({
      isEditing: !isEditing,
      kataLoaded: false,
    }))
  }

  onCodeChange = newValue => {
    this.setState({
      userCode: newValue,
    })
  }
  showSolution = () => {
    this.setState({
      onLeftPane: "solution",
    })
  }

  showDescription = () => {
    this.setState({
      onLeftPane: "description",
    })
  }

  render() {
    const { kata: kataId, deck: deckId } = this.props.match.params
    const { strengthened, userCode, onLeftPane, run, isEditing } = this.state
    const {
      katas,
      deckTitle,
      loading,
      deck,
      vim,
      cleanWorkout,
      toggleVim,
      uid,
      creator,
      katasToReview,
    } = this.props

    if (loading || katas.length === 0) {
      return <div>Loading</div>
    }
    const ind = katas.findIndex(k => k.id === kataId)
    if (ind < 0) {
      return <Redirect to="/decks" />
    }
    const { solution, description, tests, title, language } = katas[ind]
    if (isEditing) {
      return (
        <MainWrapper>
          <Header />
          <KataForm
            isEditing
            onToggleEditKata={this.onToggleEditKata}
            title={katas[ind].title}
            id={katas[ind].id}
            description={katas[ind].description}
            code={katas[ind].code}
            solution={katas[ind].solution}
            tests={katas[ind].tests.join(";")}
          />
        </MainWrapper>
      )
    }

    return (
      <MainWrapper>
        <Header />
        <WorkspaceWrapper>
          <ControlBar
            showSolution={this.showSolution}
            showDescription={this.showDescription}
            katas={katas}
            katasToReview={katasToReview}
            deckTitle={deckTitle}
            deckId={deckId}
            kataId={kataId}
            isEditable={uid === creator}
            onToggleEditKata={this.onToggleEditKata}
            onNext={this.onNext}
            cleanWorkout={cleanWorkout}
            onRunCode={this.onRunCode}
          />
          <SplitPane split="vertical" defaultSize={"50vw"}>
            <Editor
              onChange={this.onCodeChange}
              value={userCode}
              language={deck.language}
              vim={vim}
              toggleVim={toggleVim}
              runCode={this.onRunCode}
              again={run && !strengthened ? () => this.onReview(0) : () => {}}
              good={run && !strengthened ? () => this.onReview(1) : () => {}}
              easy={run && !strengthened ? () => this.onReview(2) : () => {}}
            />
            <LeftPaneWrapper>
              {onLeftPane === "results" ? (
                <ListResults tests={tests} showSolution={this.showSolution} />
              ) : (
                <KataDetails
                  kataTitle={title}
                  onLeftPane={onLeftPane}
                  solution={
                    language === "javascript"
                      ? beautify(solution).code
                      : solution
                  }
                  description={description}
                />
              )}

              {run &&
                !strengthened && (
                  <ReviewButtons>
                    <button onClick={() => this.onReview(0)}>Again</button>
                    <button onClick={() => this.onReview(1)}>Good</button>
                    <button onClick={() => this.onReview(2)}>Easy</button>
                  </ReviewButtons>
                )}
              {strengthened && <div>Reviewed</div>}
            </LeftPaneWrapper>
          </SplitPane>
        </WorkspaceWrapper>
      </MainWrapper>
    )
  }
}

WorkspacePage.defaultProps = {
  code: "",
  error: "",
  uid: "",
  creator: "",
  deckTitle: "",
  katas: [],
  katasToReview: [],
  cleanWorkout: () => {},
}
WorkspacePage.propTypes = {
  code: PropTypes.string,
  deckTitle: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  deck: PropTypes.shape({}).isRequired,
  cleanWorkout: PropTypes.func,
  toggleVim: PropTypes.func.isRequired,
  creator: PropTypes.string,
  vim: PropTypes.bool.isRequired,
  uid: PropTypes.string,
  runCode: PropTypes.func.isRequired,
  katas: PropTypes.arrayOf(PropTypes.object),
  katasToReview: PropTypes.arrayOf(PropTypes.object),
  fetchKatas: PropTypes.func.isRequired,
  fetchKatasToReview: PropTypes.func.isRequired,
  onStrengthen: PropTypes.func.isRequired,
  onNextKata: PropTypes.func.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      deck: PropTypes.string.isRequired,
      kata: PropTypes.string.isRequired,
    }),
  }).isRequired,
}

const mapStateToProps = state => ({
  vim: state.user.vim,
  token: state.user.token,
  uid: state.user.id,
  katas: state.deck.katas,
  katasToReview: state.deck.katasToReview,
  deckTitle: state.deck.title,
  deck: state.deck,
  creator: state.deck.creator,
  loading: state.deck.loading,
  error: state.deck.error,
})

const mapDispatchToProps = dispatch => ({
  fetchKatas: deck => dispatch(fetchKatas(deck)),
  fetchKatasToReview: (uid, deck) => dispatch(fetchKatasToReview(uid, deck)),
  onNextKata: () => dispatch(onNextKata()),
  onStrengthen: (uid, deckId, kataId, easiness) =>
    dispatch(onStrengthen(uid, deckId, kataId, easiness)),
  runCode: (code, solution, tests, language, bundledModules) =>
    dispatch(runCode(code, solution, tests, language, bundledModules)),
  toggleVim: () => dispatch(toggleVim()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WorkspacePage)
