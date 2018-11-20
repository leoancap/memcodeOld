import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const KataDetails = ({ kataTitle, solution, description, onLeftPane }) => (
  <KataDetailsStyled>
    {onLeftPane === "solution" ? (
      <div>
        <h3>Solution:</h3>
        <pre>
          <code>{solution}</code>
        </pre>
      </div>
    ) : (
      <div>
        <h3>{kataTitle}</h3>
        <hr />
        <pre>
          <code>{description}</code>
        </pre>
      </div>
    )}
  </KataDetailsStyled>
)

const KataDetailsStyled = styled.section`
  background: #272822;
  font-size: 2rem;
  height: 90%;
  overflow-y: auto;
  border-radius: 1rem;
  ::-webkit-scrollbar {
    display: none;
  }
  hr {
    margin-left: 1rem;
    margin-right: 1rem;
  }
  pre,
  code {
    font-family: menlo, monospace;
    font-size: 1.7rem;
  }
  h3 {
    text-align: center;
    height: 1rem;
  }
  pre {
    overflow: auto;
  }
  pre > code {
    display: block;
    padding: 1rem;
    word-wrap: normal;
    white-space: pre-wrap;
  }
`

KataDetails.propTypes = {
  kataTitle: PropTypes.string.isRequired,
  solution: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onLeftPane: PropTypes.string.isRequired,
}

export default KataDetails
