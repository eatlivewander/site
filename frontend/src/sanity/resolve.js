import { defineLocations } from "sanity/presentation";

export const resolve = {
  locations: {
    post: defineLocations({
      select: {
        title: "title",
        slug: "slug.current",
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Untitled",
            href: `/posts/${doc?.slug}`,
          },
          { title: "Posts index", href: `/posts` },
        ],
      }),
    }),
  },
};
