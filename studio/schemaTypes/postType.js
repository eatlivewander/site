import {IoDocumentTextOutline} from 'react-icons/io5'

export default {
  name: 'posts',
  title: 'Posts',
  type: 'document',
  icon: IoDocumentTextOutline,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(10).max(120),
      description: 'Main title of the post',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'categories'}]}],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Important for SEO and accessibility',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Short summary for previews',
      validation: (Rule) => Rule.max(160),
    },

    // Modular page type and sections
    {
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      options: {
        list: [
          {title: 'Standard', value: 'standard'},
          {title: 'Feature', value: 'feature'},
          {title: 'Gallery', value: 'gallery'},
          // Add your custom page types here
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'standard',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Image caption',
              description: 'Caption displayed below the image.',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessiblity.',
            },
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      title: 'Publish Date',
      type: 'datetime',
      description: 'When the post goes live',
      validation: (Rule) => Rule.required(),
    },
  ],
  options: {
    presentation: {
      url: ({document}) =>
        document?.slug?.current ? `http://localhost:3000/${document.slug.current}` : undefined,
    },
  },
  preview: {
    select: {
      title: 'title',
      authorName: 'author.givenName',
      media: 'mainImage',
      publishedAt: 'publishedAt',
    },
    prepare(selection) {
      const {title, authorName, media, publishedAt} = selection
      return {
        title,
        subtitle: authorName ? `by ${authorName}` : '',
        media,
        description: publishedAt
          ? `Published on ${new Date(publishedAt).toLocaleDateString()}`
          : '',
      }
    },
  },
}
