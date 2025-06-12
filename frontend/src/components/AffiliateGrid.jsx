"use client";

import styled from "styled-components";
import Image from "next/image";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  padding: 1.5rem;
  max-width: 1200px;
  margin: 90px auto 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    padding: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    margin-top: 70px;
    gap: 0.5rem;
    padding: 1rem;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 4/5;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  display: block;
  background: white;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.08);

  &:hover {
    transform: translateY(-6px);
    box-shadow:
      0 10px 20px rgba(0, 0, 0, 0.15),
      0 3px 6px rgba(0, 0, 0, 0.1);

    .overlay {
      opacity: 1;
    }
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(237, 141, 38, 0.5) 0%,
    rgba(237, 141, 38, 0.65) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  padding: 1.5rem;
  color: white;
  text-align: center;
`;

const BuyButton = styled.a`
  background: transparent;
  color: white;
  padding: 0.8rem 2rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  border: 2px solid white;

  &:hover {
    transform: scale(1.05);
  }
`;

export default function AffiliateGrid({ products = [] }) {
  if (!Array.isArray(products)) {
    console.error("Products prop must be an array");
    return null;
  }

  return (
    <Grid>
      {products.map((product) => (
        <ImageContainer key={product.referralLink}>
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            style={{
              objectFit: "cover",
            }}
          />
          <Overlay className="overlay">
            <BuyButton
              href={product.referralLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy
            </BuyButton>
          </Overlay>
        </ImageContainer>
      ))}
    </Grid>
  );
}
