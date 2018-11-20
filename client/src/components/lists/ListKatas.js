import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const ListKatas = ({ katas, deckID }) => {
  if (!katas) {
    return <div>Loading....</div>
  }

  return (
    <ListKatasStyled>
      {katas.map((v, i) => (
        <ListItemStyled key={v + i}>
          <div>
            <Link to={`/deck/${deckID}/${v.id}`}>{v.title}</Link>
          </div>
        </ListItemStyled>
      ))}
    </ListKatasStyled>
  )
}

const ListItemStyled = styled.section`
  font-size: 1.7rem;
  a {
    margin-bottom: 0.5rem;
    color: #777;
    font-size: 2rem;
    text-decoration: none;
  }

  div:hover {
    cursor: pointer;
    transform: scale(1.1);
    color: #999;
  }
`

const ListKatasStyled = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(1rem, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(2rem, 1fr));
  grid-auto-flow: column;
  grid-gap: 1rem;
  padding-left: 4rem;

  font-size: 2rem;
  overflow-y: auto;
  height: 80vh;
  box-sizing: content-box;
  ::-webkit-scrollbar {
    display: none;
  }

  li {
    list-style: none;
  }
`

ListKatas.defaultProps = {
  katas: [],
}

ListKatas.propTypes = {
  katas: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
  deckID: PropTypes.string.isRequired,
}

export default ListKatas
