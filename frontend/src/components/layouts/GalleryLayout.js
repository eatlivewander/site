"use client";

import React from "react";
import styled from "styled-components";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../../sanity/imageUrl";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Excerpt = styled.p`
  color: #666;
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;

  &:hover img {
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const Caption = styled.p`
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #666;
  text-align: center;
`;

const Content = styled.section`
  max-width: 768px;
  margin: 3rem auto;
  line-height: 1.6;
`;

export default function GalleryLayout({ post }) {
  // Extract images from the content
  const images = post.content?.filter((block) => block._type === "image") || [];

  // Filter out non-image content for the text content
  const textContent =
    post.content?.filter((block) => block._type !== "image") || [];

  const portableTextComponents = {
    types: {
      image: () => null, // Don't render images in the content section
    },
  };

  return (
    <Container>
      <Header>
        <Title>{post.title}</Title>
        {post.excerpt && <Excerpt>{post.excerpt}</Excerpt>}
      </Header>

      {/* Main featured image */}
      {post.mainImage?.asset?.url && (
        <ImageContainer>
          <Image
            src={post.mainImage.asset.url}
            alt={post.mainImage.alt || post.title}
          />
          {post.mainImage.alt && <Caption>{post.mainImage.alt}</Caption>}
        </ImageContainer>
      )}

      {/* Gallery grid */}
      <GalleryGrid>
        {images.map((image, index) => {
          if (!image?.asset?.url) return null;
          const imageUrl = urlFor(image).width(800).url();

          return (
            <ImageContainer key={index}>
              <Image
                src={imageUrl}
                alt={image.alt || image.caption || `Gallery image ${index + 1}`}
              />
              {(image.alt || image.caption) && (
                <Caption>{image.alt || image.caption}</Caption>
              )}
            </ImageContainer>
          );
        })}
      </GalleryGrid>

      {/* Text content */}
      <Content>
        <PortableText value={textContent} components={portableTextComponents} />
      </Content>
    </Container>
  );
}
