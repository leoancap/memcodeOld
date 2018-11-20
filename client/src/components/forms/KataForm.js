import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import styled from "styled-components"
import { withRouter } from "react-router-dom"

import Button from "../Button"
import Input from "../Input"
import TextArea from "../TextArea"
import Editor from "../Editor"

import validateNewKata from "../../utils/validateNewKata"

import { history } from "../../routes/AppRouter"

import {
  addKataBegin,
  fetchKatas,
  editKataBegin,
  removeKataBegin,
} from "../../actions/deck"
import { runCode } from "../../actions/workout"
import { toggleVim } from "../../actions/users"

class KataForm extends React.Component {
  state = {
    title: this.props.title,
    description: this.props.description,
    code: this.props.code,
    solution: this.props.solution,
    tests: this.props.tests,
    error: "",
  }

  componentDidMount = () => {}

  onChange = ({ target: { name, value } }) => {
    this.setState(() => ({
      [name]: value,
    }))
  }

  onDescriptionChange = description => {
    this.setState({
      description,
    })
  }

  onCodeChange = code => {
    this.setState({
      code,
    })
  }

  onTestsChange = tests => {
    this.setState({
      tests,
    })
  }

  onSolutionChange = solution => {
    if (this.props.deck.language === "javascript") {
      this.setState({
        solution,
        code: `${solution.split("\n")[0]} \n\n}`,
      })
    } else if (this.props.deck.language === "scheme") {
      this.setState({
        solution,
        code: `${solution.split("\n")[0]} \n\n}`,
      })
    }
  }

  onSubmit = async () => {
    const { description, title, code, solution } = this.state
    const tests = this.state.tests.split(";")

    const { isEditing, deck, uid, katas, id } = this.props
    const language = deck.language
    const { deck: deckId, kata: kataId } = this.props.match.params
    const kata = {
      title,
      description,
      code,
      solution,
      tests: tests.filter(t => t.length > 1),
      language,
    }
    if (id) kata.id = id
    if (!uid) history.push("/login")

    try {
      if (!description || !title || !code || !solution || !tests) {
        this.setState(() => ({
          error: "Please provide description, title and tests",
        }))
      } else {
        // const solutions = katas
        //   .filter(k => k.id !== kataId)
        //   .map(k => k.solution)
        // const bundledModules = solutions.reduce(
        //   (prev, next) => prev + " ; " + next,
        // )

        // for (const test of tests) {
        //   const u = bb.transform(code, { presets: ["es2015"] }).code
        //   const s = await evalWorker(
        //     bundledModules + " ; " + solution + " ; " + test,
        //     2000,
        //   )
        // }
        await validateNewKata(katas, code, solution, kataId, tests, language)

        this.setState(() => ({
          error: "",
        }))

        if (isEditing) {
          const kataId = this.props.match.params.kata
          this.props.editKataBegin(deckId, kata)
          history.go(`/deck/${deckId}/${kataId}`)
          // onToggleEditKata()
        } else {
          this.props.addKataBegin(deckId, kata)
          history.go(`/deck/${deckId}`)
        }
      }
    } catch (error) {
      this.setState(() => ({
        error: `${error.error} ;   ${error.message}`,
      }))
    }
  }

  onRemoveKata = () => {
    const { kata: kataId, deck: deckId } = this.props.match.params
    this.props.removeKataBegin(deckId, kataId)
    history.push(`/deck/${deckId}`)
  }

  render() {
    const { title, description, code, solution, tests, error } = this.state
    const {
      isEditing,
      onToggleEditKata,
      vim,
      toggleVim,
      onAddKata,
      deck,
    } = this.props
    return (
      <KataFormStyled>
        <Buttons>
          <Button onClick={this.onSubmit} small primary add>
            {isEditing ? "Edit Kata" : "Create Kata"}
          </Button>
          <Button onClick={isEditing ? onToggleEditKata : onAddKata} small>
            Cancel
          </Button>
          {isEditing && (
            <Button red onClick={this.onRemoveKata} small>
              Remove
            </Button>
          )}
        </Buttons>
        <hr />

        <Panes>
          <LeftPane>
            <div>
              <h2>Title:</h2>
              <Input
                name="title"
                placeholder="Kata's title"
                value={title}
                onChange={this.onChange}
              />
            </div>
            <div>
              <h2>Description:</h2>
              <TextArea
                rows={9}
                width={"30vw"}
                name="description"
                placeholder="Add a description for your katas"
                value={description}
                onChange={this.onChange}
              />
            </div>
            <div>
              <h2>Tests:</h2>
              <Editor
                height={"10vw"}
                width={"30vw"}
                vim={vim}
                toggleVim={toggleVim}
                value={tests}
                onChange={this.onTestsChange}
              />
            </div>
            <div>{error && <h2>{error.toString()}</h2>}</div>
          </LeftPane>

          <RightPane>
            <div>
              <h2>Default Code:</h2>
              <Editor
                value={code}
                onChange={this.onCodeChange}
                language={deck.language}
                height={"20vh"}
                width={"40vw"}
                vim={vim}
                toggleVim={toggleVim}
              />
            </div>
            <div>
              <h2>Solution:</h2>
              <Editor
                value={solution}
                onChange={this.onSolutionChange}
                language={deck.language}
                height={"40vh"}
                width={"40vw"}
                vim={vim}
                toggleVim={toggleVim}
              />
            </div>
          </RightPane>
        </Panes>
      </KataFormStyled>
    )
  }
}

KataForm.defaultProps = {
  title: "",
  description: "",
  code: `const add = (a, b) => {\n\n}`,
  solution: `const add = (a, b) => {\n\treturn a + b;\n}`,
  tests: `//add(1,2);\n//add(2,5);\n//tests must be semicolon separated.`,
}

const LeftPane = styled.section`
  display: grid;
  justify-content: flex-end;
  padding-right: 1rem;
`

const RightPane = styled.section`
  display: grid;
  justify-content: flex-start;
`
const Panes = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const Buttons = styled.section`
  display: grid;
  grid-template-columns: 20rem 20rem 20rem;
  padding: 5px;
  padding-left: 10rem;
  justify-content: center;
`

const KataFormStyled = styled.section`
  display: grid;
  /* grid-template-columns: 1fr 1fr; */
  grid-template-rows: 5rem 1rem auto;
  /* justify-items: center; */
  /* padding: 5rem; */
  hr {
    opacity: 0.05;
    color: inherit;
    width: 100vw;
  }
`

const mapStateToProps = state => ({
  uid: state.user.token,
  vim: state.user.vim,
  deck: state.deck,
  katas: state.deck.katas,
})

const mapDispatchToProps = dispatch => ({
  addKataBegin: (deck, kata) => dispatch(addKataBegin(deck, kata)),
  editKataBegin: (deck, kata) => dispatch(editKataBegin(deck, kata)),
  removeKataBegin: (deck, kata) => dispatch(removeKataBegin(deck, kata)),
  fetchKatas: deck => dispatch(fetchKatas(deck)),
  toggleVim: () => dispatch(toggleVim()),
  runCode: (code, solution, tests, language, bundledModules) =>
    dispatch(runCode(code, solution, tests, language, bundledModules)),
})

KataForm.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  solution: PropTypes.string.isRequired,
  tests: PropTypes.string.isRequired,
  isEditing: PropTypes.bool.isRequired,
  vim: PropTypes.bool.isRequired,
  editKataBegin: PropTypes.func.isRequired,
  toggleVim: PropTypes.func.isRequired,
  onAddKata: PropTypes.func.isRequired,
  addKataBegin: PropTypes.func.isRequired,
  removeKataBegin: PropTypes.func.isRequired,
  onToggleEditKata: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.string.isRequired,
  }).isRequired,
  deck: PropTypes.shape({
    language: PropTypes.string.isRequired,
  }).isRequired,
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(KataForm),
)
