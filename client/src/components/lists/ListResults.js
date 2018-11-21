import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { connect } from "react-redux"
import uuidv1 from "uuid/v1"

const comparedResults = (userResults, solutionResults) =>
  userResults.map(
    (r, i) => JSON.stringify(r) === JSON.stringify(solutionResults[i]),
  )

const ListResults = ({ tests, workout }) => {
  if (Object.keys(workout).length === 0) {
    return <div>Loading...</div>
  }
  if (workout.error) {
    if (workout.error.error) {
      return (
        <ErrorMessages>
          <pre>
            <code>{JSON.stringify(workout.error, null, 2)}</code>
          </pre>
        </ErrorMessages>
      )
    }
    if (workout.error.loc) {
      return (
        <ErrorMessages>
          <pre>
            <code>
              {`${JSON.stringify(workout.error.loc)} \n ${
                workout.error.codeFrame
              }`}
            </code>
          </pre>
        </ErrorMessages>
      )
    }
    return (
      <ErrorMessages>
        <pre>
          <code>
            {workout.error.message ? workout.error.message : workout.error}
          </code>
        </pre>
      </ErrorMessages>
    )
  }
  if (workout.loading) {
    return <ListStyled>...Loading</ListStyled>
  }

  const comp = comparedResults(workout.userResults, workout.solutionResults)

  return (
    <ListStyled>
      <div>
        <h2>Test:</h2>
        <ul>
          {tests.map(t => (
            <li key={uuidv1()}>{t}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Expected:</h2>
        <ul>
          {workout.solutionResults.map(r => (
            <li key={uuidv1()}>
              {typeof r === "undefined" ? "undefined" : JSON.stringify(r)}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Received:</h2>
        <ul>
          {workout.userResults.map(r => (
            <li key={uuidv1()}>
              {typeof r === "undefined" ? "undefined" : JSON.stringify(r)}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Results:</h2>
        <ul>
          {comp.map(
            (r, i) =>
              r ? (
                <li key={r + i} style={{ color: "#1e9117" }}>
                  Passed
                </li>
              ) : (
                <li key={r + i} style={{ color: "#9c274e" }}>
                  Failed
                </li>
              ),
          )}
        </ul>
      </div>
    </ListStyled>
  )
}

const ErrorMessages = styled.section`
  font-size: 2rem;
  padding-right: 1rem;
  overflow-y: auto;
  background: #272822;
  height: 90%;
  ::-webkit-scrollbar {
    display: none;
  }
  pre,
  code {
    font-family: menlo, monospace;
    font-size: 1.7rem;
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

const ListStyled = styled.section`
  /* display: grid; */
  /* grid-template-columns: repeat(4, 1fr); */

  background: #272822;
  height: 90%;
  display: flex;
  justify-content: space-around;

  li {
    padding-left: 5px;
    font-size: 2rem;
  }
  ul {
    list-style: none;
    -webkit-padding-start: 0;
  }
`

const mapStateToProps = state => ({
  decks: state.decks,
  workout: state.workout,
})

ListResults.propTypes = {
  workout: PropTypes.shape({}).isRequired,
  tests: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
}

export default connect(mapStateToProps)(ListResults)
