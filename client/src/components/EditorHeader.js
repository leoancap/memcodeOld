import React from "react"
import styled from "styled-components"

import JSIcon from "../assets/icons/js-editor.png"
import REIcon from "../assets/icons/reason.jpg"

import Button from "./Button"

const EditorHeader = ({ language, kataTitle }) => {
  return (
    <EditorHeaderStyles>
      <KataTitle>
        {language === "javascript" && (
          <JavascriptIcon>
            <img src={JSIcon} alt="" />
          </JavascriptIcon>
        )}
        {language === "reasonml" && (
          <ReasonIcon>
            <img src={REIcon} alt="" />
          </ReasonIcon>
        )}
        <h2>{kataTitle}</h2>
      </KataTitle>
    </EditorHeaderStyles>
  )
}

const KataTitle = styled.section`
  background: #2f312a;
  width: fit-content;
  display: grid;
  grid-template-columns: 1fr auto;
  h2 {
    font-size: 1.7rem;
    padding-left: 1rem;
    padding-right: 1rem;
    min-width: 10rem;
  }
`
const ReasonIcon = styled.section`
  background: #2f312a;
  img {
    height: 1.5rem;
    margin-top: 5px;
    padding: 1.5rem 0.5rem 1rem;
    padding-left: 1.5rem;
  }
`
const JavascriptIcon = styled.section`
  img {
    height: 1.5rem;
    margin-top: 4px;
    padding: 1.5rem 0.5rem 1rem;
    padding-left: 1.2rem;
  }
`

const EditorHeaderStyles = styled.section`
  display: flex;
`

export default EditorHeader
