import {FaShareAlt} from 'react-icons/fa'

export default {
  name: 'socialPosts',
  title: 'Social Posts',
  type: 'document',
  icon: FaShareAlt,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'A descriptive title for internal reference',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A brief description of the social post content',
      validation: (Rule) => Rule.required().min(10).max(280),
      rows: 3,
    },
    {
      name: 'socialUrls',
      title: 'Social Media URLs',
      type: 'object',
      description: 'Add URLs for each platform where this content is shared',
      fields: [
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
          description: 'Link to the Instagram post',
        },
        {
          name: 'tiktok',
          title: 'TikTok URL',
          type: 'url',
          description: 'Link to the TikTok video',
        },
        {
          name: 'youtube',
          title: 'YouTube URL',
          type: 'url',
          description: 'Link to the YouTube video',
        },
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
          description: 'Link to the Facebook post',
        },
      ],
      validation: (Rule) =>
        Rule.custom((urls) => {
          // Check if at least one URL is provided
          if (!urls || !Object.values(urls).some((url) => url)) {
            return 'At least one social media URL is required'
          }
          return true
        }),
    },
    {
      name: 'image',
      title: 'Social Post Image',
      type: 'image',
      options: {
        accept: '.webp',
        hotspot: true,
      },
      validation: (Rule) =>
        Rule.required()
          .custom((value) => {
            if (!value?.asset?._ref) {
              return true // Skip validation if no image is uploaded yet
            }
            // Check if the file extension is .webp
            if (!value.asset._ref.toLowerCase().endsWith('-webp')) {
              return 'Only .webp images are allowed'
            }
            return true
          })
          .error('Image is required and must be in .webp format'),
      description: 'Upload a .webp image for the social post',
    },
    {
      name: 'affiliateLinks',
      title: 'Affiliate Links',
      type: 'array',
      description: 'Add and arrange Amazon product affiliate links',
      of: [
        {
          type: 'reference',
          to: [{type: 'amazonProducts'}],
        },
      ],
      options: {
        layout: 'grid',
        sortable: true,
      },
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200,
        slugify: (input) => {
          // Convert to lowercase, remove special characters, replace spaces with hyphens
          return input
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
        },
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      initialValue: 'social',
      readOnly: true,
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      socialUrls: 'socialUrls',
      description: 'description',
      media: 'image',
      affiliateCount: 'affiliateLinks.length',
    },
    prepare({title, socialUrls, description, media, affiliateCount}) {
      // Get list of platforms that have URLs
      const platforms = socialUrls
        ? Object.entries(socialUrls)
            .filter(([_, url]) => url)
            .map(([platform]) => platform.charAt(0).toUpperCase() + platform.slice(1))
            .join(', ')
        : ''

      const affiliateInfo = affiliateCount ? ` - ${affiliateCount} products` : ''

      return {
        title: title,
        subtitle: `${platforms}${affiliateInfo} - ${description?.slice(0, 50)}${description?.length > 50 ? '...' : ''}`,
        media: media || FaShareAlt,
      }
    },
  },
}
