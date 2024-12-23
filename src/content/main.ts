import { sendMessage } from 'webext-bridge/content-script'
import { setupApp, storageActivityWebsiteMap } from '~/logic'

import App from './Content.vue'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

const enable = computed(() => {
  return location.protocol.includes('http') && !!storageActivityWebsiteMap.value[location.host]
})

/** 创建 root 节点 */
function createRoot(target: HTMLElement) {
  const container = document.createElement('div')
  container.id = __NAME__
  const root = document.createElement('div')
  const styleEl = document.createElement('link')
  const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container
  styleEl.setAttribute('rel', 'stylesheet')
  styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'))
  shadowDOM.appendChild(styleEl)
  shadowDOM.appendChild(root)
  target.appendChild(container)

  return root
}

/** 更新 page 只有首次加载完毕才会执行 */
async function updatePage() {
  if (enable.value) {
    // 启用
  }
  else {
    // 禁用
  }
}

/** 更新 icon 要实时 */
async function updateIcon(show: boolean) {
  sendMessage('event-activity', { show }, 'background')
}

watch(() => enable.value, updateIcon, { immediate: true })
window.addEventListener('load', updatePage)

const app = createApp(App)
setupApp(app, { context: 'content' })
app.mount(createRoot(document.querySelector('html')!))
