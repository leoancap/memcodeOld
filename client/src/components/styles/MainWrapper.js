import styled, { injectGlobal } from "styled-components"

injectGlobal` 
* {
    box-sizing: border-box !important;
}
  html {
    box-sizing: border-box !important;
    /* background: rgb(39, 40, 34); */
    background: #1f201c;
    height: 100%;
    width: 100%;
    font-size: 62.5% !important;
    line-height: 1.6;
    color: grey;
    font-family: Monofur ;
    font-size: 0.4rem;
  }
  body {
    margin: 0;
    overflow: hidden ;
    height: 100%
  }
  hr {
    opacity: 0.04;
    color: inherit;
  }
  button {
    outline: none;
    border: none;
    cursor: pointer;
  }
`

const Wrapper = styled.section`
  display: grid;
  grid-template-rows: 5rem auto;

  height: 100vh;
`

export default Wrapper
