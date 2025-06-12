import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { device } from "../../styles/breakpoints";
import Image from "next/image";

const MenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 998;
`;

const MenuWrapper = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 400px;
  height: 100vh;
  background: white;
  z-index: 999;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);

  ${device.phone} {
    width: 85%;
  }
`;

const MenuTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #eee;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  color: #000;

  &:hover {
    opacity: 0.7;
  }
`;

const MenuContent = styled.div`
  padding: 40px 20px;
  overflow-y: auto;
`;

const MenuSection = styled.div`
  margin-bottom: 40px;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled(motion.li)`
  margin-bottom: 20px;

  a {
    color: #000;
    text-decoration: none;
    font-size: 24px;
    font-family: "Neutraface", sans-serif;

    &:hover {
      opacity: 0.7;
    }
  }
`;

const menuVariants = {
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  closed: {
    x: "-100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

const overlayVariants = {
  open: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  closed: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const itemVariants = {
  open: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
    },
  }),
  closed: {
    opacity: 0,
    y: 20,
  },
};

const Menu = ({ isOpen, onClose }) => {
  const menuItems = [
    { title: "Journal", href: "#journal" },
    { title: "About", href: "#about" },
    { title: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleMenuClick = (e) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <MenuOverlay
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            onClick={onClose}
          />
          <MenuWrapper
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            onClick={handleMenuClick}
          >
            <MenuTop>
              <CloseButton onClick={onClose}>
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                  <rect
                    y="16.9706"
                    width="24"
                    height="2"
                    transform="rotate(-45 0 16.9706)"
                    fill="currentColor"
                  />
                  <rect
                    x="1.41406"
                    width="24"
                    height="2"
                    transform="rotate(45 1.41406 0)"
                    fill="currentColor"
                  />
                </svg>
              </CloseButton>
              <Image
                src="/eatlivewanderlogo.svg"
                alt="Eat Live Wander"
                width={130}
                height={42}
                priority={true}
                style={{
                  filter: "brightness(0)",
                  width: "130px",
                  height: "42px",
                }}
              />
            </MenuTop>
            <MenuContent>
              <MenuSection>
                <MenuList>
                  {menuItems.map((item, i) => (
                    <MenuItem
                      key={item.title}
                      custom={i}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                    >
                      <a href={item.href} onClick={onClose}>
                        {item.title}
                      </a>
                    </MenuItem>
                  ))}
                </MenuList>
              </MenuSection>
            </MenuContent>
          </MenuWrapper>
        </>
      )}
    </AnimatePresence>
  );
};

export default Menu;
