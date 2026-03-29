<script setup lang="ts">
const appConfig = useAppConfig()
const site = useSiteConfig()
const { modules, activeModule, isModuleActive } = useDocsModules()

const links = computed(() => appConfig.github?.url
  ? [
      {
        icon: 'i-simple-icons-github',
        to: appConfig.github.url,
        target: '_blank',
        'aria-label': 'GitHub',
      },
    ]
  : [])
</script>

<template>
  <UHeader
    :ui="{ center: 'flex-1' }"
    to="/"
    :title="appConfig.header?.title || site.name"
  >
    <AppHeaderCenter />

    <template #title>
      <div class="flex items-center gap-2.5">
        <div class="flex items-center gap-1.5">
          <UIcon name="i-lucide-gamepad-2" class="size-4 text-sky-500" />
          <span class="font-semibold text-sm select-none">Phaser</span>
        </div>
        <span class="text-black/30 dark:text-white/30 text-sm select-none">×</span>
        <div class="flex items-center gap-1.5">
          <UIcon name="i-simple-icons-vuedotjs" class="size-4 text-emerald-500" />
          <span class="font-semibold text-sm select-none">Vue</span>
        </div>
      </div>
    </template>

    <template #right>
      <UContentSearchButton class="lg:hidden" />

      <ClientOnly>
        <UColorModeButton />

        <template #fallback>
          <div class="h-8 w-8 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
        </template>
      </ClientOnly>

      <template v-if="links.length">
        <UButton
          v-for="(link, index) of links"
          :key="index"
          v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>
    </template>

    <template #toggle="{ open, toggle }">
      <IconMenuToggle
        :open="open"
        class="lg:hidden"
        @click="toggle"
      />
    </template>

    <template #body>
      <AppHeaderBody />
    </template>

    <template
      v-if="activeModule"
      #bottom
    >
      <div class="docs-subheader hidden lg:block border-t border-default">
        <UContainer class="flex items-center">
          <UNavigationMenu
            :items="modules.map(module => ({
              label: module.label,
              to: module.to,
              icon: module.id === 'vue' ? 'i-simple-icons-vuedotjs' : 'i-simple-icons-nuxtdotjs',
              active: isModuleActive(module),
            }))"
            variant="pill"
            highlight
            class="-mx-2.5 -mb-px"
          />
        </UContainer>
      </div>
    </template>
  </UHeader>
</template>
