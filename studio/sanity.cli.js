import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '62iqq5yn',
    dataset: 'production',
  },
  studioHost: 'eatlivewander',
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
