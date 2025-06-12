export default {
  name: "amazonProducts",
  title: "Amazon Products",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Product Image",
      type: "image",
      options: {
        accept: "image/webp",
      },
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value?.asset?._ref) {
            return "Image is required";
          }
          if (!value.asset._ref.includes("webp")) {
            return "Only WebP images are allowed";
          }
          return true;
        }),
    },
    {
      name: "referralLink",
      title: "Amazon Referral Link",
      type: "url",
      validation: (Rule) =>
        Rule.required()
          .uri({
            scheme: ["http", "https"],
          })
          .custom((url) => {
            if (!url.includes("amazon.com")) {
              return "URL must be from amazon.com";
            }
            return true;
          }),
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
};
