import styled from "styled-components"

const DecksTabsStyled = styled.section`
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
  }
  margin: 0;
  padding: 0;
  font-size: 1.7rem;
  direction: ltr;
  border-bottom: solid 1px rgba(255, 255, 255, 0.1);
  margin-bottom: 20px;
  overflow: hidden;
  color: #a6a6a6;
  input {
    opacity: 0.8;
    background-position: 15rem 1.4rem;
    background-size: 1.5rem;
    padding-right: 2rem;
    margin-bottom: 2px;
    margin-right: 1rem;
    font-size: 2rem;
    outline: none;
    width: 20rem;
  }
  button {
    margin-left: -2rem;
  }
  span {
    cursor: pointer;
    padding-right: 1rem;
    padding-left: 1rem;
  }
  div > img {
    height: 1.8rem;
    margin-top: 8px;
  }
  span:first-of-type {
    background-color: ${props => props.language === "Javascript" && "#414339"};
    padding-right: 5px;
  }
  span:nth-of-type(2) {
    background-color: ${props => props.language === "Scheme" && "#414339"};
  }
`

export default DecksTabsStyled
