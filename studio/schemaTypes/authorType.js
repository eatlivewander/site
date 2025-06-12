import {FaUser} from 'react-icons/fa'

export default {
  name: 'author',
  title: 'Authors',
  type: 'document',
  icon: FaUser,
  preview: {
    select: {
      givenName: 'givenName',
      familyName: 'familyName',
      role: 'jobTitle',
      media: 'image',
    },
    prepare({givenName, familyName, role, media}) {
      const capitalizedRole = role ? role.charAt(0).toUpperCase() + role.slice(1).toLowerCase() : ''
      return {
        title: `${givenName || ''} ${familyName || ''}`.trim(),
        subtitle: capitalizedRole,
        media,
      }
    },
  },
  fieldsets: [
    {
      name: 'requiredFields',
      title: 'Required Fields',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'optionalFields',
      title: 'Optional Fields',
      options: {collapsible: true, collapsed: true},
    },
  ],
  fields: [
    // Required Fields
    {
      name: 'givenName',
      title: 'First Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      fieldset: 'requiredFields',
    },
    {
      name: 'familyName',
      title: 'Last Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      fieldset: 'requiredFields',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => doc.givenName,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug is required.'),
      fieldset: 'requiredFields',
    },
    {
      name: 'jobTitle',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          {title: 'Publisher', value: 'publisher'},
          {title: 'Editor', value: 'editor'},
          {title: 'Contributor', value: 'contributor'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
      fieldset: 'requiredFields',
    },
    {
      name: 'knowsAbout',
      title: 'Areas of Expertise',
      type: 'array',
      fieldset: 'requiredFields',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      validation: (Rule) =>
        Rule.required().min(1).error('Please enter at least one area of expertise.'),
      description:
        'Add topics the author is knowledgeable about (e.g., Food, Beauty, Travel, etc.)',
    },
    {
      name: 'image',
      title: 'Headshot',
      type: 'image',
      options: {
        hotspot: true,
        accept: '.webp',
      },
      validation: (Rule) => Rule.required(),
      description: 'Must be a .webp file',
      fieldset: 'requiredFields',
    },
    {
      name: 'description',
      title: 'Bio',
      type: 'text',
      validation: (Rule) => Rule.required(),
      fieldset: 'requiredFields',
    },

    // Optional Fields
    {
      name: 'additionalName',
      title: 'Middle Name',
      type: 'string',
      fieldset: 'optionalFields',
    },
    {
      name: 'honorificPrefix',
      title: 'Prefix',
      type: 'string',
      fieldset: 'optionalFields',
      placeholder: 'Dr., Lord, Lady, The Honorable, etc.',
      description: 'Honorific title placed before the name.',
    },
    {
      name: 'honorificSuffix',
      title: 'Suffixes',
      type: 'string',
      fieldset: 'optionalFields',
      placeholder: 'Jr., III, MD, PhD, etc.',
      description: 'Titles or distinctions that follow the name.',
    },
    {
      name: 'email',
      title: 'Public Email',
      type: 'email',
      fieldset: 'optionalFields',
      placeholder: 'you@example.com',
      validation: (Rule) => Rule.email().error('Must be a valid email address'),
    },
    {
      name: 'personalWebsite',
      title: 'Personal Website',
      type: 'url',
      fieldset: 'optionalFields',
      placeholder: 'https://example.com',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }).error('Must be a valid URL starting with http:// or https://'),
    },
    {
      name: 'instagram',
      title: 'Instagram',
      type: 'url',
      fieldset: 'optionalFields',
      placeholder: 'https://www.instagram.com/username',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }).custom((url) => {
          if (!url) return true // Allow empty
          return url.includes('instagram.com/') ? true : 'Must be a valid Instagram URL'
        }),
    },
    {
      name: 'threads',
      title: 'Threads',
      type: 'url',
      fieldset: 'optionalFields',
      placeholder: 'https://www.threads.com/username',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }).custom((url) => {
          if (!url) return true
          return url.includes('threads.com/') ? true : 'Must be a valid Threads URL'
        }),
    },
    {
      name: 'facebook',
      title: 'Facebook',
      type: 'url',
      fieldset: 'optionalFields',
      placeholder: 'https://www.facebook.com/username',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }).custom((url) => {
          if (!url) return true
          return url.includes('facebook.com/') ? true : 'Must be a valid Facebook URL'
        }),
    },
    {
      name: 'x',
      title: 'X (formerly Twitter)',
      type: 'url',
      fieldset: 'optionalFields',
      placeholder: 'https://www.x.com/username',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }).custom((url) => {
          if (!url) return true
          return url.includes('x.com/') ? true : 'Must be a valid X URL'
        }),
    },
    {
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
      fieldset: 'optionalFields',
      placeholder: 'https://www.linkedin.com/in/username',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }).custom((url) => {
          if (!url) return true
          return url.includes('linkedin.com/in/') ? true : 'Must be a valid LinkedIn URL'
        }),
    },
    {
      name: 'tiktok',
      title: 'TikTok',
      type: 'url',
      fieldset: 'optionalFields',
      placeholder: 'https://www.tiktok.com/@username',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }).custom((url) => {
          if (!url) return true
          return url.includes('tiktok.com/@') ? true : 'Must be a valid TikTok URL'
        }),
    },
    {
      name: 'pinterest',
      title: 'Pinterest',
      type: 'url',
      fieldset: 'optionalFields',
      placeholder: 'https://www.pinterest.com/username',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }).custom((url) => {
          if (!url) return true
          return url.includes('pinterest.com/') ? true : 'Must be a valid Pinterest URL'
        }),
    },
    {
      name: 'snapchat',
      title: 'Snapchat',
      type: 'url',
      fieldset: 'optionalFields',
      placeholder: 'https://www.snapchat.com/username',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }).custom((url) => {
          if (!url) return true
          return url.includes('snapchat.com/') ? true : 'Must be a valid Snapchat URL'
        }),
    },
    {
      name: 'youtube',
      title: 'YouTube',
      type: 'url',
      fieldset: 'optionalFields',
      placeholder: 'https://www.youtube.com/username',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }).custom((url) => {
          if (!url) return true
          return url.includes('youtube.com/') ? true : 'Must be a valid YouTube URL'
        }),
    },
    {
      name: 'twitch',
      title: 'Twitch',
      type: 'url',
      fieldset: 'optionalFields',
      placeholder: 'https://www.twitch.tv/username',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }).custom((url) => {
          if (!url) return true
          return url.includes('twitch.tv/') ? true : 'Must be a valid Twitch URL'
        }),
    },
    {
      name: 'spotify',
      title: 'Spotify',
      type: 'url',
      fieldset: 'optionalFields',
      placeholder: 'https://open.spotify.com/user/username',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }).custom((url) => {
          if (!url) return true
          return url.includes('spotify.com/') ? true : 'Must be a valid Spotify URL'
        }),
    },
    {
      name: 'appleMusic',
      title: 'Apple Music',
      type: 'url',
      fieldset: 'optionalFields',
      placeholder: 'https://music.apple.com/profile/username',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }).custom((url) => {
          if (!url) return true // Allow empty
          return url.includes('music.apple.com/profile/') ? true : 'Must be a valid Apple Music URL'
        }),
    },
    {
      name: 'applePodcasts',
      title: 'Apple Podcasts',
      type: 'url',
      fieldset: 'optionalFields',
      placeholder: 'https://podcasts.apple.com/podcast/username/id123456789',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }).custom((url) => {
          if (!url) return true // Allow empty
          return url.includes('podcasts.apple.com/podcast/')
            ? true
            : 'Must be a valid Apple Podcasts URL'
        }),
    },
    {
      name: 'signal',
      title: 'Signal',
      type: 'url',
      fieldset: 'optionalFields',
      placeholder: 'https://signal.org/user/username',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }).custom((url) => {
          if (!url) return true // Allow empty
          return url.includes('signal.org/user/') ? true : 'Must be a valid Signal URL'
        }),
    },
    {
      name: 'telegram',
      title: 'Telegram',
      type: 'url',
      fieldset: 'optionalFields',
      placeholder: 'https://t.me/username',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }).custom((url) => {
          if (!url) return true // Allow empty
          return url.includes('t.me/') ? true : 'Must be a valid Telegram URL'
        }),
    },
    {
      name: 'discord',
      title: 'Discord',
      type: 'url',
      fieldset: 'optionalFields',
      placeholder: 'https://discord.com/users/username',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }).custom((url) => {
          if (!url) return true // Allow empty
          return url.includes('discord.com/users/') ? true : 'Must be a valid Discord URL'
        }),
    },
    {
      name: 'patreon',
      title: 'Patreon',
      type: 'url',
      fieldset: 'optionalFields',
      placeholder: 'https://www.patreon.com/username',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }).custom((url) => {
          if (!url) return true
          return url.includes('patreon.com/') ? true : 'Must be a valid Patreon URL'
        }),
    },
  ],
}
