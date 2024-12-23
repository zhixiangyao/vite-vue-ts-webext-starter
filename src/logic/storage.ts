import { useWebExtensionStorage } from '~/composables/useWebExtensionStorage'

export const storageCurrentTab = useWebExtensionStorage<{ id?: number }>('webext-current-tab', { id: void 0 })

export const storageActivityWebsiteMap = useWebExtensionStorage<Record<string, boolean>>(
  'webext-activity-website-map',
  {},
)
