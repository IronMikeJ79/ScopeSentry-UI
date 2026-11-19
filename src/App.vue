<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { ConfigGlobal } from '@/components/ConfigGlobal'
import { useDesign } from '@/hooks/web/useDesign'
import { useStorage } from '@/hooks/web/useStorage'
import { getCssVar, setCssVar } from './utils'
import { isDark } from '@/utils/is'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('app')

const appStore = useAppStore()

const currentSize = computed(() => appStore.getCurrentSize)

const greyMode = computed(() => appStore.getGreyMode)

const { getStorage } = useStorage('localStorage')

// Set the theme color from the browser's current theme
const setDefaultTheme = () => {
  if (getStorage('isDark') !== null) {
    // The user has already set the theme manually, so use their choice
    const isDarkValue = getStorage('isDark')
    appStore.setIsDark(isDarkValue)
    // The menu and header themes also need updating on init
    const color = getCssVar('--el-bg-color')
    appStore.setMenuTheme(color)
    appStore.setHeaderTheme(color)
  } else {
    // Fall back to the system theme when the user has not set one
    const isDarkTheme = isDark()
    appStore.setIsDark(isDarkTheme)
    // The menu and header themes also need updating on init
    const color = getCssVar('--el-bg-color')
    appStore.setMenuTheme(color)
    appStore.setHeaderTheme(color)
  }

  // Initialize the tabs view height
  const tagsViewEnabled = appStore.getTagsView
  setCssVar('--tags-view-height', tagsViewEnabled ? '35px' : '0px')
}

setDefaultTheme()
</script>

<template>
  <ConfigGlobal :size="currentSize">
    <RouterView :class="greyMode ? `${prefixCls}-grey-mode` : ''" />
  </ConfigGlobal>
</template>

<style lang="less">
@prefix-cls: ~'@{namespace}-app';

.size {
  width: 100%;
  height: 100%;
}

html,
body {
  padding: 0 !important;
  margin: 0;
  overflow: hidden;
  .size;

  #app {
    .size;
  }
}

.@{prefix-cls}-grey-mode {
  filter: grayscale(100%);
}
</style>
