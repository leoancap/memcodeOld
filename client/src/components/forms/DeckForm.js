import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import styled from "styled-components"

import Button from "../Button"
import Input from "../Input"
import TextArea from "../TextArea"

import { history } from "../../routes/AppRouter"

import { addDeckBegin } from "../../actions/decks"

class DeckForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      description: "",
      language: "javascript",
      tags: "",
      error: "",
    }
  }

  onChange = ({ target: { name, value } }) => {
    this.setState(() => ({
      [name]: value,
    }))
  }

  onSubmit = e => {
    e.preventDefault()
    const { description, title, language, tags } = this.state
    const deck = {
      title,
      description,
      tags,
      language,
      creator: this.props.uid,
    }

    if (!this.props.uid) history.push("/login")

    if (!description || !title) {
      this.setState(() => ({
        error: "Please provide description and title",
      }))
    } else {
      this.setState(() => ({
        error: "",
      }))
      this.props.addDeckBegin(deck)
      history.go("/decks")
    }
  }

  render() {
    const { description, title, language, tags } = this.state
    return (
      <DeckFormContainer language={language}>
        <div>
          <h1>Adding a Deck</h1>
          <hr />
          <h2>Title:</h2>
          <Input
            name="title"
            placeholder="Deck's title"
            value={title}
            onChange={this.onChange}
          />
          <h2>Description:</h2>
          <TextArea
            rows="2"
            name="description"
            placeholder="Add a description for your deck of katas"
            value={description}
            onChange={this.onChange}
          />
          <h2>Tags:</h2>
          <Input
            name="tags"
            placeholder="i.e. beginner, array"
            value={tags}
            onChange={this.onChange}
          />
          <h2>Language:</h2>

          <select name="language" value={language} onChange={this.onChange}>
            <option value="javascript">Javascript</option>
            <option value="scheme">scheme</option>
          </select>
          <hr />

          <Buttons>
            <Button onClick={this.onSubmit} small primary>
              Create Deck
            </Button>
            <Button onClick={this.props.onAddDeck} small>
              Cancel Creation
            </Button>
          </Buttons>
        </div>
      </DeckFormContainer>
    )
  }
}

const Buttons = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-top: 5px;
`

const DeckFormContainer = styled.section`
  display: grid;
  justify-items: center;

  h2 {
    padding-left: 2rem;
    font-size: 1.5rem;
  }
  h1 {
    font-size: 3rem;
  }
  hr {
    opacity: 0.04;
    color: inherit;
  }
  select {
    background-color: rgb(20, 20, 20, 0.5);
    border: none;
    color: grey;
    padding-left: 1rem;
    padding-right: 2rem;
    -webkit-appearance: none;
    height: 3rem;
    margin-left: 2rem;
    font-size: 1.5rem;
    appearance: none;
  }
`

const mapStateToProps = state => ({
  uid: state.user.id,
})

const mapDispatchToProps = dispatch => ({
  addDeckBegin: (deck, uid) => dispatch(addDeckBegin(deck, uid)),
})

DeckForm.propTypes = {
  uid: PropTypes.number.isRequired,
  addDeckBegin: PropTypes.func.isRequired,
  onAddDeck: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeckForm)
