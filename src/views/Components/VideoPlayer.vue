<script setup lang="ts">
import { VideoPlayer, createVideoViewer } from '@/components/VideoPlayer'
import { ContentWrap } from '@/components/ContentWrap'
import { ElDivider } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

const showVideo = () => {
  createVideoViewer({
    url: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4',
    poster: '//lf3-static.bytednsdoc.com/obj/eden-cn/nupenuvpxnuvo/xgplayer_doc/poster.jpg'
  })
}
</script>

<template>
  <ContentWrap :title="t('videoPlayerDemo.videoPlayer')">
    <VideoPlayer
      url="//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4"
      poster="//lf3-static.bytednsdoc.com/obj/eden-cn/nupenuvpxnuvo/xgplayer_doc/poster.jpg"
    />

    <ElDivider />
    <BaseButton type="primary" @click="showVideo">{{ t('videoPlayerDemo.dialogShow') }}</BaseButton>
  </ContentWrap>
</template>
