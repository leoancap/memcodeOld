import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import TagsIcon from "../../assets/icons/tags-solid.svg"

import Button from "../Button"

const ListDecks = ({ isReview, decks, onDeckClick, decksToReview }) => {
  if (isReview && Object.keys(decksToReview).length === 0) {
    return <h2>There is nothing to review</h2>
  }
  if (Object.keys(decks).length === 0) {
    return <h2>Loading...</h2>
  }
  const decksObjectfied = Object.values(decks)

  const decksReacted = decksObjectfied.map(v => (
    <ListItem key={v.title}>
      <div>
        {decksToReview && Object.keys(decksToReview).length > 0 ? (
          <Button
            transparent
            onClick={() =>
              onDeckClick(v._id, decksToReview[v._id].katasToReview[0].id)
            }
          >
            {v.title}
          </Button>
        ) : (
          <Button transparent onClick={() => onDeckClick(v._id)}>
            {v.title}
          </Button>
        )}
        {v.description.length > 150 ? (
          <span>{`${v.description.slice(0, 150)}...`}</span>
        ) : (
          <span>{v.description}</span>
        )}
        <TagItem>
          <span>
            <img src={TagsIcon} alt="" />
          </span>
          {v.tags.split(" ").map(t => (
            <div key={t}>{t}</div>
          ))}
        </TagItem>
      </div>
    </ListItem>
  ))

  return <ListDecksStyled>{decksReacted}</ListDecksStyled>
}

const ListItem = styled.section`
  box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.2);
  padding-left: 2rem;
  transition: 0.1s;
  font-size: 1.9rem;
  button {
    color: darkgrey;
    opacity: 0.8;
    font-size: larger;
    border-bottom: 1px solid rgba(100, 100, 100, 0.2);
    border-radius: unset;
    width: 100%;
  }
`

const TagItem = styled.section`
  padding-left: 1rem;
  margin-top: 0.5rem;
  direction: ltr;
  img {
    height: 1rem;
    margin-right: 0.5rem;
  }
  div {
    display: inline-block;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    /* font-family: Monaco; */
    margin: 0 10px 10px 0;
    background-color: rgba(0, 0, 0, 0.1);
  }
`

const ListDecksStyled = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(25rem, 20rem));
  grid-gap: 2rem;
  font-size: 2rem;
  padding: 1rem;
  overflow-y: auto;
  height: 70rem;
  box-sizing: content-box;
  ::-webkit-scrollbar {
    display: none;
  }

  button {
    margin-bottom: 0.5rem;
  }

  button:hover {
    cursor: pointer;
    transition: 0.3s;
    transform: scale(1.03);
  }

  li {
    list-style: none;
  }

  li:hover {
    transform: scale(1.05);
  }
`

ListDecks.defaultProps = {
  decksToReview: [],
  decks: [],
  isReview: false,
}

ListDecks.propTypes = {
  decks: PropTypes.shape(PropTypes.shape({})),
  isReview: PropTypes.bool.isRequired,
  decksToReview: PropTypes.shape(PropTypes.string.isRequired),
  onDeckClick: PropTypes.func.isRequired,
}

export default ListDecks
