import createImageUrlBuilder from "@sanity/image-url";

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: true,
};

const builder = createImageUrlBuilder(config);

export function urlFor(source) {
  return builder.image(source);
}
