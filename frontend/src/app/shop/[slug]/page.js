import { notFound } from "next/navigation";
import { sanityFetch } from "../../../sanity/live";
import AffiliateGrid from "../../../components/AffiliateGrid";

// Query for social post with affiliate links
const socialPostQuery = `*[_type == "socialPosts" && slug.current == $fullSlug][0]{
  title,
  description,
  "imageUrl": image.asset->url,
  "slug": slug.current,
  affiliateLinks[]->{
    name,
    "imageUrl": image.asset->url,
    referralLink
  },
  publishedAt
}`;

// Debug query to see all social posts
const allSocialPostsQuery = `*[_type == "socialPosts"]{
  title,
  "slug": slug.current
}`;

export const dynamic = "force-dynamic";

export default async function ShopPage({ params }) {
  const { slug } = params;
  const fullSlug = `shop/${slug}`;

  console.log("==================== DEBUG INFO ====================");
  console.log("Requested slug:", slug);

  try {
    // First, get all social posts to debug
    const allPosts = await sanityFetch({
      query: allSocialPostsQuery,
    });
    console.log("All available social posts:", allPosts);

    // Now try to get the specific post
    const response = await sanityFetch({
      query: socialPostQuery,
      params: { fullSlug },
    });

    console.log("Query used:", socialPostQuery);
    console.log("Params:", { fullSlug });
    console.log("Full response:", JSON.stringify(response, null, 2));

    if (!response?.data) {
      console.log("No data found in response");
      console.log("Response structure:", response);
      return notFound();
    }

    const affiliateLinks = response.data.affiliateLinks || [];

    return <AffiliateGrid products={affiliateLinks} />;
  } catch (error) {
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      params: { slug },
    });
    return notFound();
  }
}
