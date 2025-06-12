import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {presentationTool} from 'sanity/presentation'
import {media} from 'sanity-plugin-media'
import {schemaTypes} from './schemaTypes'
import {resolve} from '../frontend/src/sanity/resolve'

export default defineConfig({
  name: 'default',
  title: 'Eat Live Wander',
  projectId: '62iqq5yn',
  dataset: 'production',
  scheduledPublishing: {
    enabled: true,
    inputDateTimeFormat: 'MM/dd/yyy h:mm a',
  },
  plugins: [
    structureTool(),
    media(),
    visionTool(),
    presentationTool({
      resolve,
      previewUrl: {
        origin: 'http://localhost:3000/',
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
