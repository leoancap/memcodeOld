import styled from "styled-components"

const ControlBarStyled = styled.section`
  background: #1f201c;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding-left: 1rem; */
  padding-right: 2rem;

  .popup-overlay {
    position: relative !important;
  }
  .popup-content {
    /* left: 3px !important; */
  }

  ul {
    list-style: none;
    -webkit-padding-start: 0;
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(10, 3rem);
    /* grid-template-columns: repeat(4, minmax(10rem, 15rem)); */
  }

  button:hover {
    opacity: 1.8;
    background: #373832;
  }
  li button:hover {
    width: 100%;
  }

  div,
  button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: inherit;
    background: inherit;
    border: none;
    outline: none;
  }
`
const ButtonStyled = styled.button`
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  border-radius: 0.5rem;
  /* padding-left: 2rem; */
  img {
    height: 1.4rem;
    color: white;
    opacity: 0.5;
    margin-right: 1rem;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  span {
    font-size: 1.4rem;
    /* margin-left: 1.3rem; */
  }
  ${({ vim }) =>
    vim &&
    `
  img {
    height: 2.3rem
  }
  `} ${({ disabled }) =>
    disabled &&
    `
  pointer-events: none;
  opacity: 0.3 !important;
  transform: scale(1) !important;
      box-shadow: 0 1px 0 1px rgba(8, 9, 9, 0.2);
    `};
`
const popupArrowStyle = {
  background: "1e221e",
  opacity: 1.8,
}

const popupStyle = {
  background: "darkslategrey",
  color: "burlywood",
  opacity: 1.8,
  fontSize: "2rem",
  border: "none",
  width: "auto",
  justify: "end",
  zIndex: 10,
  borderRadius: "1rem",
}

export { popupArrowStyle, popupStyle, ButtonStyled, ControlBarStyled }
