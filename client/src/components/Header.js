import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import styled from "styled-components"

import { history } from "../routes/AppRouter"

import { logoutBegin } from "../actions/auth"

import terminal from "../assets/icons/terminal.svg"
import bug from "../assets/icons/bug.svg"

import Button from "./Button"

const Header = ({ isAuthenticated, logout }) => {
  const onLogin = () => {
    history.push("/login")
  }

  const onIconClick = url => {
    history.push(`${url}`)
  }

  return (
    <HeaderStyle>
      <div>
        <ButtonStyled onClick={() => onIconClick("/decks")}>
          <img src={terminal} alt="terminal" />
          <span>Memcode</span>
        </ButtonStyled>
        <ButtonStyled onClick={() => onIconClick("/bugs")}>
          <img src={bug} alt="bug" />
          <span>Strengthen</span>
        </ButtonStyled>
      </div>
      {isAuthenticated ? (
        <Button primary onClick={logout}>
          logout
        </Button>
      ) : (
        <Button onClick={onLogin}>login</Button>
        // <Link to="/login">login</Link>
      )}
    </HeaderStyle>
  )
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
}
const ButtonStyled = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 3rem;
  margin-left: 3rem;
  padding-right: 3.5rem;
  * {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  span {
    font-size: 2rem;
  }
  img {
    height: 2.3rem;
    padding: 0.5rem;
    opacity: 0.6;
  }
`

const HeaderStyle = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: -webkit-linear-gradient(left, #1a201c, #272822);
  border-bottom: 1px solid #191c1a;
  * {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  button:hover {
    opacity: 1.8;
    background: #373832;
    border-radius:1rem; 

  }
  button {
    color: inherit;
    background: inherit;
    border: none;
  
`

const mapStateToProps = state => ({
  isAuthenticated: !!state.user.token,
  logoutBegin: PropTypes.func.isRequired,
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutBegin()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)
