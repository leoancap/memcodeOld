import styled from "styled-components"

const StrengthenLevels = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5rem;
  padding: 1rem 5rem;
  button {
    padding: 1rem;
    margin: 1rem;
    border: none;
    font-size: 1.5rem;
  }
  button:nth-of-type(1) {
    background: #7c172e;
    color: grey;
  }
  button:nth-of-type(2) {
    background: #1e9116;
  }
  button:nth-of-type(3) {
    background: #2e4196;
    color: lightgrey;
  }
`

export default StrengthenLevels
