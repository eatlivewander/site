"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0; /* ✅ Removes 8px default */
    padding: 0;
    font-family: sans-serif; /* or whatever you're using */
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
