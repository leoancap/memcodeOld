import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { history } from "../routes/AppRouter"

import Button from "./Button"

const BreadCrumbStyled = styled.section``

const BreadCrumb = ({
  katas,
  deckTitle,
  kataId,
  deckId,
  showDescription,
  showSolution,
  onNext,
}) => {
  const ind = katas.findIndex(k => k.id === kataId)

  const hasPrev = currentKataIndex => {
    if (currentKataIndex - 1 >= 0) {
      return false
    }
    return true
  }
  const hasNext = (katas, currentKataIndex) => {
    if (currentKataIndex + 1 < katas.length) {
      return false
    }
    return true
  }

  return (
    <BreadCrumbStyled>
      <div>
        <Button disabled={hasPrev(ind)} onClick={() => onNext(ind - 1)} small>
          &lt; Prev
        </Button>
        <Button
          disabled={hasNext(katas, ind)}
          onClick={() => onNext(ind + 1)}
          small
        >
          Next &gt;
        </Button>
        <Button small onClick={showDescription}>
          description
        </Button>
        <Button small onClick={showSolution}>
          solution
        </Button>
      </div>
    </BreadCrumbStyled>
  )
}

export default BreadCrumb
