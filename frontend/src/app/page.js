import Link from "next/link";
import { client } from "../sanity/client";

const POSTS_QUERY = `*[
  _type == "posts"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch(POSTS_QUERY, {}, options);

  return (
    <main
      style={{
        maxWidth: "768px",
        margin: "0 auto",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "2.25rem",
          fontWeight: "bold",
          marginBottom: "2rem",
        }}
      >
        Posts
      </h1>
      <ul style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {posts.map((post) => (
          <li key={post._id}>
            <Link
              href={`/${post.slug.current}`}
              style={{ textDecoration: "none" }}
              legacyBehavior>
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  textDecoration: "underline",
                }}
              >
                {post.title}
              </h2>
              <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
