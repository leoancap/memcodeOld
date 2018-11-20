import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const TextAreaStyled = styled.section`
  textarea {
    padding: 0.7rem 1rem 0.7rem 1rem;
    margin: 0.7rem 1rem 0.7rem 1rem;
    color: grey;
    font-size: 1.5rem;
    border-radius: 0.5rem;
    border: none;
    background-color: rgb(20, 20, 20, 0.5);
    width: 30vw;
  }
`

const TextArea = ({ name, placeholder, value, onChange, rows }) => (
  <TextAreaStyled>
    <textarea
      type="text"
      name={name}
      value={value}
      rows={rows}
      placeholder={placeholder}
      onChange={onChange}
    />
  </TextAreaStyled>
)

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  rows: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default TextArea
