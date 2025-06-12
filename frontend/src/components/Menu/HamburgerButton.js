import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 6px;

  &:hover {
    opacity: 0.7;
  }
`;

const Line = styled.span`
  display: block;
  width: 24px;
  height: 2px;
  background-color: ${(props) =>
    props.$isScrolled || !props.$isHomepage ? "#000" : "#fff"};
  transition: background-color 0.25s linear;
`;

const HamburgerButton = ({ onClick, isScrolled, isHomepage }) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };

  return (
    <Button onClick={handleClick} aria-label="Open menu">
      <Line $isScrolled={isScrolled} $isHomepage={isHomepage} />
      <Line $isScrolled={isScrolled} $isHomepage={isHomepage} />
      <Line $isScrolled={isScrolled} $isHomepage={isHomepage} />
    </Button>
  );
};

export default HamburgerButton;
