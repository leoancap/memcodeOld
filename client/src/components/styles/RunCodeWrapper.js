import styled from "styled-components"

const Wrapper = styled.section`
  margin-top: -1px;
  margin-left: 1px;
    padding-bottom: 2rem;
  button {
    border: none;
    background-color: ${props => (props.primary ? "#1f201d" : "#2f312a")};
    color: ${props => (props.primary ? "grey" : "gray")};
    padding: 5px 3rem 5px 3rem;
    cursor: pointer;
    font-size: ${props => (props.small ? "1.5rem" : "2rem")};
    outline: none;
  }
  button:hover {
    transform: scale(1.05);
    box-shadow: 0 1px 0 1px rgba(80, 90, 90, 0.2);
  }
  button:nth-of-type(2) {
    opacity: ${props => (props.disabled ? "0.5" : "1")}
    background-color: ${props => (props.disabled ? "inherit" : "#2c6b73")}
    color: ${props => (props.disabled ? "inherit" : "#232820")};
    transform: scale(1.05);
  }
`

export default Wrapper
