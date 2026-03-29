export default defineAppConfig({
  docus: {
    locale: 'en',
    assistant: false,
  },
  header: {
    title: 'phaser-vue',
  },
  github: {
    url: 'https://github.com/onmax/phaser-vue',
    branch: 'main',
    rootDir: 'docs',
  },
  socials: {
    npm: 'https://www.npmjs.com/package/@onmax/phaser-vue',
    nuxt: 'https://nuxt.com',
  },
  assistant: { enabled: false, explainWithAi: false },
  toc: {
    title: 'On This Page',
  },
  ui: {
    colors: {
      primary: 'sky',
      secondary: 'amber',
      neutral: 'slate',
      success: 'emerald',
      info: 'cyan',
      warning: 'yellow',
      error: 'rose',
    },
    commandPalette: {
      slots: {
        item: 'items-center',
        input: '[&_.iconify]:size-4 [&_.iconify]:mx-0.5',
        itemLeadingIcon: 'size-4 mx-0.5',
      },
    },
    contentNavigation: {
      slots: {
        linkLeadingIcon: 'size-4 mr-1',
        linkTrailing: 'hidden',
      },
      defaultVariants: {
        variant: 'link',
      },
    },
    pageLinks: {
      slots: {
        linkLeadingIcon: 'size-4',
        linkLabelExternalIcon: 'size-2.5',
      },
    },
    pageHero: {
      slots: {
        title: 'font-semibold sm:text-5xl lg:text-6xl',
        description: 'text-lg sm:text-xl text-muted max-w-2xl mx-auto',
        links: 'gap-3',
      },
    },
    pageSection: {
      slots: {
        title: 'font-semibold !leading-snug text-2xl sm:text-3xl',
        description: 'text-muted max-w-2xl mx-auto',
      },
    },
    pageCard: {
      slots: {
        root: 'text-left',
        container: 'items-start text-left',
        wrapper: 'grid grid-cols-[auto_1fr] items-start gap-x-3 gap-y-2 text-left',
        leading: 'col-start-1 row-start-1 mb-0 mt-0.5',
        leadingIcon: 'size-5 text-primary',
        body: 'contents',
        title: 'col-start-2 row-start-1 font-semibold text-left',
        description: 'col-span-2 text-muted font-normal text-left',
      },
    },
  },
})
