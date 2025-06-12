"use client";

import React from "react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../sanity/imageUrl";

export default function PostContent({ post }) {
  if (!post || !post.data) {
    return null;
  }

  const {
    title,
    description,
    mainImage,
    body,
    publishedAt,
    author,
    categories,
    slug,
  } = post.data;

  // PortableText components to render rich text and images inside content
  const portableTextComponents = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?.url) return null;

        const imageUrl = urlFor(value).width(800).url();
        const altText = value.alt || value.caption || "Post image";

        return (
          <img
            src={imageUrl}
            alt={altText}
            style={{ maxWidth: "100%", borderRadius: "1rem", margin: "2rem 0" }}
          />
        );
      },
    },
  };

  return (
    <article>
      {/* Main post image */}
      {mainImage?.asset?.url && (
        <img
          src={mainImage.asset.url}
          alt={mainImage.alt || title}
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      )}
      {/* Title */}
      <h1>{title}</h1>
      {/* Author info */}
      {author && (
        <section
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          {author.image?.url && (
            <img
              src={author.image.url}
              alt={author.name}
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                marginRight: "1rem",
              }}
            />
          )}
          <div>
            <strong>
              {author.slug?.current ? (
                <Link href={`/author/${author.slug.current}`} legacyBehavior>
                  {author.name}
                </Link>
              ) : (
                author.name
              )}
            </strong>
            {author.description && (
              <p style={{ margin: 0, fontSize: "0.9rem", color: "#666" }}>
                {author.description}
              </p>
            )}
          </div>
        </section>
      )}
      {/* Published date */}
      <p style={{ fontSize: "0.85rem", color: "#999" }}>
        Published on: {new Date(publishedAt).toLocaleDateString()}
      </p>
      {/* Excerpt */}
      {description && (
        <p style={{ fontStyle: "italic", marginTop: "1rem" }}>{description}</p>
      )}
      {/* Categories */}
      {categories?.length > 0 && (
        <section style={{ marginTop: "1rem" }}>
          <strong>Categories:</strong>
          <ul>
            {categories.map((cat) => (
              <li key={cat.slug.current}>
                {cat.title} ({cat.slug.current})
              </li>
            ))}
          </ul>
        </section>
      )}
      {/* Content */}
      <section style={{ marginTop: "2rem" }}>
        <PortableText value={body} components={portableTextComponents} />
      </section>
    </article>
  );
}
