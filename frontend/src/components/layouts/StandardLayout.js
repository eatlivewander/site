"use client";

import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../../sanity/imageUrl";

const Container = styled.div`
  max-width: 768px;
  margin: 0 auto;
  padding: 2rem;
`;

const Article = styled.article`
  margin-bottom: 4rem;
`;

const MainImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.2;
`;

const AuthorSection = styled.section`
  display: flex;
  align-items: center;
  margin: 2rem 0;
  gap: 1rem;
`;

const AuthorImage = styled.img`
  width: 50px;
  height: 50px;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.strong`
  font-size: 1.1rem;
`;

const AuthorBio = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.9rem;
`;

const PublishDate = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 1rem 0;
`;

const Content = styled.section`
  line-height: 1.6;

  p {
    margin-bottom: 1.5rem;
  }

  h2 {
    margin: 2rem 0 1rem;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 2rem 0;
  }
`;

export default function StandardLayout({ post }) {
  const portableTextComponents = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?.url) return null;
        const imageUrl = urlFor(value).width(800).url();
        return (
          <img
            src={imageUrl}
            alt={value.alt || value.caption || "Post image"}
            style={{ maxWidth: "100%", borderRadius: "8px", margin: "2rem 0" }}
          />
        );
      },
    },
  };

  return (
    <Container>
      <Article>
        {post.mainImage?.asset?.url && (
          <MainImage
            src={post.mainImage.asset.url}
            alt={post.mainImage.alt || post.title}
          />
        )}

        <Title>{post.title}</Title>

        {post.author && (
          <AuthorSection>
            {post.author.image?.url && (
              <AuthorImage src={post.author.image.url} alt={post.author.name} />
            )}
            <AuthorInfo>
              <AuthorName>
                {post.author.slug?.current ? (
                  <Link
                    href={`/author/${post.author.slug.current}`}
                    legacyBehavior
                  >
                    {post.author.name}
                  </Link>
                ) : (
                  post.author.name
                )}
              </AuthorName>
              {post.author.description && (
                <AuthorBio>{post.author.description}</AuthorBio>
              )}
            </AuthorInfo>
          </AuthorSection>
        )}

        <PublishDate>
          Published on: {new Date(post.publishedAt).toLocaleDateString()}
        </PublishDate>

        <Content>
          <PortableText
            value={post.content}
            components={portableTextComponents}
          />
        </Content>
      </Article>
    </Container>
  );
}
