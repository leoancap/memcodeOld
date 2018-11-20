import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import Button from "../Button"

class KatasFilters extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tags: [
        "Fundamentals",
        "Algorithms",
        "Data Type",
        "Logic",
        "Number",
        "String",
        "Recursion",
        "Array",
        "Mathematics",
        "Data Structure",
        "Regular Expression",
      ],
      difficulties: ["beginner", "intermediate", "advanced"],
    }
  }

  render() {
    const { tags, difficulties } = this.state
    return (
      <div>
        <DecksFilterStyle>
          <h2>Difficulties</h2>
          <ul>
            {difficulties.map(d => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </DecksFilterStyle>
        <DecksFilterStyle>
          <h2>Tags</h2>
          <ul>
            {tags.map(d => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </DecksFilterStyle>
      </div>
    )
  }
}

const DecksFilterStyle = styled.section`
  background-color: rgba(0, 0, 0, 0.2) !important;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-top: 1rem;
  
   h2 {
    font-size: 2rem;
    padding: 0 2rem 0 2rem;
  }
  li {
    list-style: none
    font-size: 2rem;
  }
`

const mapStateToProps = state => ({
  uid: state.user.token,
})

const mapDispatchToProps = dispatch => ({
  //   fetchFilterKatasPerTag: tag => dispatch(fetchFilterKatasPerTag(tag)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KatasFilters)
