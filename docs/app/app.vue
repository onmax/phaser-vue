<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { transformNavigation } from './utils/navigation'

const { seo } = useAppConfig()
const site = useSiteConfig()
const route = useRoute()
const { activeModule } = useDocsModules()

const hasDocsSubheader = computed(() => route.meta.layout === 'docs' && activeModule.value !== null)

useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
})

useSeoMeta({
  titleTemplate: title => title ? `${title} · ${site.name}` : site.name,
  title: seo.title,
  description: seo.description,
  ogSiteName: site.name,
  twitterCard: 'summary_large_image',
})

const { data: navigation } = await useAsyncData('navigation_docs', () => queryCollectionNavigation('docs'), {
  transform: (data: ContentNavigationItem[]) => transformNavigation(data, false),
})

const { data: files } = useLazyAsyncData('search_docs', () => queryCollectionSearchSections('docs'), {
  server: false,
})

provide('navigation', navigation)
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator color="var(--ui-primary)" />

    <div :class="{ 'docs-app-has-subheader': hasDocsSubheader }">
      <AppHeader v-if="$route.meta.header !== false" />

      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>

      <AppFooter v-if="$route.meta.footer !== false" />
    </div>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
      />
    </ClientOnly>
  </UApp>
</template>
