"use client";

import React from "react";
import styled from "styled-components";
import PostContent from "../PostContent";

const LayoutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const StandardLayout = ({ post }) => {
  return (
    <LayoutContainer>
      <article>
        {post.mainImage?.asset?.url && (
          <img
            src={post.mainImage.asset.url}
            alt={post.mainImage.alt || post.title}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              marginBottom: "2rem",
            }}
          />
        )}
        <h1>{post.title}</h1>
        {/* Add more standard layout content */}
      </article>
    </LayoutContainer>
  );
};

const GalleryLayout = ({ post }) => {
  return (
    <LayoutContainer>
      <article>
        <h1>{post.title}</h1>
        {/* Add gallery layout specific content */}
      </article>
    </LayoutContainer>
  );
};

export default function LayoutWrapper({ post }) {
  const postData = post?.data || post;

  if (!postData) {
    return <StandardLayout post={post} />;
  }

  const pageType = postData.pageType;

  if (pageType === "feature") {
    return <PostContent post={post} />;
  }

  if (pageType === "gallery") {
    return <GalleryLayout post={post} />;
  }

  return <StandardLayout post={post} />;
}
