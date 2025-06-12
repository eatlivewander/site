// Breakpoint sizes in pixels
export const size = {
  phone: 480,
  tablet: 768,
  desktop: 1024,
  largeDesktop: 1440,
};

// Media queries
export const device = {
  phone: `@media (max-width: ${size.phone}px)`,
  tablet: `@media (min-width: ${size.phone + 1}px) and (max-width: ${size.tablet}px)`,
  desktop: `@media (min-width: ${size.tablet + 1}px) and (max-width: ${size.desktop}px)`,
  largeDesktop: `@media (min-width: ${size.desktop + 1}px)`,

  // Additional helper queries
  belowTablet: `@media (max-width: ${size.tablet}px)`,
  belowDesktop: `@media (max-width: ${size.desktop}px)`,
  abovePhone: `@media (min-width: ${size.phone + 1}px)`,
  aboveTablet: `@media (min-width: ${size.tablet + 1}px)`,
};

// Usage example:
// ${device.phone} {
//   // styles for phones
// }
