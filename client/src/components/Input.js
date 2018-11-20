import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const InputStyled = styled.section`
  input {
    padding: 0.7rem 1rem 0.7rem 1rem;
    color: grey;
    font-size: 1.5rem;
    border-radius: 0.5rem;
    border: none;
    background-color: rgb(20, 20, 20, 0.5);
  }
`

const Input = ({ type, name, placeholder, value, onChange }) => (
  <InputStyled>
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  </InputStyled>
)

Input.defaultProps = {
  type: "text",
}

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Input
