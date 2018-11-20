import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const ButtonStyled = styled.section`
  button {
    border-radius: 1rem;
    border: none;

    background-color: ${props => (props.primary ? "#1f201d" : "#2f312a")};
    color: ${props => (props.primary ? "grey" : "gray")};

    background-color: ${props =>
      props.red ? "darkred !important" : "#2f312a"};
    color: ${props => (props.red ? "gainsboro !important" : "gray")};

    background-color: ${props => (props.add ? "darkcyan" : "#2f312a")};
    color: ${props => (props.add ? "black" : "gray")};

    background-color: ${props =>
      props.transparent ? "transparent" : "#2f312a"};
    opacity: ${props => (props.transparent ? "0.9" : "1")};

    padding: 5px 3rem 5px 3rem;
    cursor: pointer;
    font-size: ${props => (props.small ? "1.5rem" : "2rem")};
    outline: none;
  }

  button:hover {
    transform: scale(1.05);
    box-shadow: 0 1px 0 1px rgba(80, 90, 90, 0.1);
  }

  ${({ disabled }) =>
    disabled &&
    ` button {
      opacity: 0.3 !important;
      transform: scale(1) !important;
      box-shadow: 0 1px 0 1px rgba(8, 9, 9, 0.2);
    }
  }
  `};
`

const Button = ({
  add,
  small,
  onClick,
  children,
  primary,
  disabled,
  red,
  transparent,
}) => (
  <ButtonStyled
    disabled={disabled}
    add={add}
    small={small}
    red={red}
    primary={primary}
    transparent={transparent}
  >
    <button disabled={disabled} onClick={onClick}>
      {children}
    </button>
  </ButtonStyled>
)
Button.defaultProps = {
  add: false,
  small: false,
  primary: false,
  disabled: false,
  red: false,
  transparent: false,
}

Button.propTypes = {
  add: PropTypes.bool,
  transparent: PropTypes.bool,
  small: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape({}),
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
  primary: PropTypes.bool,
  disabled: PropTypes.bool,
  red: PropTypes.bool,
}

export default Button
