// windi css
import '@/plugins/unocss'

// global svg icons
import '@/plugins/svgIcon'

// i18n setup
import { setupI18n } from '@/plugins/vueI18n'

// state management
import { setupStore } from '@/store'

// global components
import { setupGlobCom } from '@/components'

// element-plus
import { setupElementPlus } from '@/plugins/elementPlus'

// global styles
import '@/styles/index.less'

// animations
import '@/plugins/animate.css'

// router
import { setupRouter } from './router'

// directives
import { setupPermission } from './directives'

import { createApp } from 'vue'

import App from './App.vue'

import './permission'

// create app instance
const setupAll = async () => {
  const app = createApp(App)

  await setupI18n(app)

  setupStore(app)

  setupGlobCom(app)

  setupElementPlus(app)

  setupRouter(app)

  setupPermission(app)

  app.mount('#app')
}

setupAll()
