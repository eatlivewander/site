"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { device } from "../../styles/breakpoints";
import Menu from "../Menu/Menu";
import HamburgerButton from "../Menu/HamburgerButton";

const NavbarWrapper = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 90px;
  z-index: 997;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  box-sizing: border-box;
  transition: all 0.25s linear;
  border-bottom: 1px solid
    ${(props) =>
      props.$isHomepage ? "rgb(255, 255, 255)" : "rgba(0, 0, 0, 0.1)"};

  font-family: "Neutraface", sans-serif;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 0.522px;
  line-height: 28.8px;
  -webkit-font-smoothing: antialiased;

  ${device.phone} {
    height: 70px;
    padding: 0;
  }

  ${device.tablet} {
    height: 80px;
    padding: 0 1.5rem;
  }
`;

const LogoImage = styled(Image)`
  height: 40px !important;
  width: 300px !important;
  filter: ${(props) =>
    props.$isScrolled || !props.$isHomepage
      ? "brightness(0)"
      : "brightness(1) invert(1)"};
  transition: filter 0.25s linear;

  ${device.phone} {
    height: 25px !important;
    width: 190px !important;
  }

  ${device.tablet} {
    height: 35px !important;
    width: 220px !important;
  }
`;

const LogoWrapper = styled.a`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  height: 100%;
  width: 300px;

  ${device.phone} {
    width: 190px;
    position: relative;
    left: auto;
    transform: none;
    margin: 0 auto;
  }

  ${device.tablet} {
    width: 220px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const MenuButtonWrapper = styled.div`
  position: relative;
  z-index: 997;
`;

const NavLinks = styled.div`
  margin-left: auto;
  display: flex;
  gap: 2rem;

  ${device.phone} {
    gap: 1rem;
    font-size: 16px;
  }

  ${device.tablet} {
    gap: 1.5rem;
    font-size: 17px;
  }

  a {
    color: inherit;
    text-decoration: none;
    text-decoration-color: rgba(0, 0, 0, 0.5);
    text-decoration-thickness: 1px;
    transition: color 0.2s;
  }

  a:hover {
    color: #999;
  }
`;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const controls = useAnimation();
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  useEffect(() => {
    // Check scroll position immediately on mount
    setIsScrolled(window.scrollY > 10);

    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isHomepage) {
      controls.start({
        backgroundColor: isScrolled
          ? "rgba(255, 255, 255, 1)"
          : "rgba(255, 255, 255, 0)",
        borderBottomColor: isScrolled
          ? "rgba(0, 0, 0, 0.1)"
          : "rgba(255, 255, 255, 1)",
        color: isScrolled ? "black" : "white",
      });
    } else {
      controls.start({
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderBottomColor: "rgba(0, 0, 0, 0.1)",
        color: "black",
      });
    }
  }, [isScrolled, controls, isHomepage]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <NavbarWrapper
        animate={controls}
        initial={
          isHomepage
            ? {
                backgroundColor: isScrolled
                  ? "rgba(255,255,255,1)"
                  : "rgba(255,255,255,0)",
                color: isScrolled ? "black" : "white",
                borderBottomColor: isScrolled
                  ? "rgba(0, 0, 0, 0.1)"
                  : "rgba(255, 255, 255, 1)",
              }
            : {
                backgroundColor: "rgba(255,255,255,1)",
                color: "black",
                borderBottomColor: "rgba(0, 0, 0, 0.1)",
              }
        }
        $isHomepage={isHomepage}
      >
        {/* <MenuButtonWrapper>
          <HamburgerButton 
            onClick={handleMenuToggle} 
            isScrolled={isScrolled} 
            isHomepage={isHomepage}
          />
        </MenuButtonWrapper> */}
        <LogoWrapper href="/social">
          <LogoImage
            src="/eatlivewanderlogo.svg"
            alt="Eat Live Wander"
            width={300}
            height={40}
            priority={true}
            style={{ objectFit: "contain" }}
            $isScrolled={isScrolled}
            $isHomepage={isHomepage}
          />
        </LogoWrapper>
      </NavbarWrapper>
      {/* <Menu isOpen={isMenuOpen} onClose={handleMenuClose} /> */}
    </>
  );
}
