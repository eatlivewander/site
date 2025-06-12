import { notFound } from "next/navigation";
import { sanityFetch } from "../../sanity/live";
import LayoutWrapper from "../../components/layouts/LayoutWrapper";
import SocialGrid from "../../components/SocialGrid";

// Query for regular posts
const postQuery = `*[_type == "posts" && slug.current == $slug][0]{
  _id,
  title,
  "author": author->{
    givenName,
    familyName,
    slug,
    jobTitle,
    "image": image.asset->{
      url
    },
    description,
    "name": coalesce(givenName + " " + familyName, "")
  },
  "categories": categories[]->{
    title,
    slug
  },
  pageType,
  publishedAt,
  excerpt,
  mainImage {
    asset-> {
      url
    },
    alt
  },
  content[]{
    ...,
    asset->
  }
}`;

// Query for social posts grid
const socialPostsQuery = `*[_type == "socialPosts"] | order(publishedAt desc) {
  title,
  description,
  "imageUrl": image.asset->url,
  socialUrls,
  publishedAt,
  "slug": slug.current
}`;

export const dynamic = "force-dynamic";

export default async function Page({ params }) {
  const { slug } = params;

  // Special case for social posts grid
  if (
    slug === "tiktok" ||
    slug === "facebook" ||
    slug === "youtube" ||
    slug === "instagram" ||
    slug === "social"
  ) {
    try {
      const response = await sanityFetch({ query: socialPostsQuery });
      console.log("Social posts response:", response);
      const socialPosts = response?.data || [];

      if (!socialPosts || socialPosts.length === 0) {
        return notFound();
      }

      return <SocialGrid posts={socialPosts} />;
    } catch (error) {
      console.error("Error fetching social posts:", error);
      return notFound();
    }
  }

  // Regular post handling
  try {
    const response = await sanityFetch({ query: postQuery, params: { slug } });
    console.log("Regular post response:", response);

    if (!response?.data) {
      return notFound();
    }

    // Format the post data to match the expected structure
    const formattedPost = {
      data: {
        ...response.data,
        body: response.data.content, // Map content to body for PostContent component
      },
    };

    return <LayoutWrapper post={formattedPost} />;
  } catch (error) {
    console.error("Error fetching regular post:", error);
    return notFound();
  }
}
