<template>
  <UApp>
    <div class="docs-shell">
      <aside class="docs-nav">
        <h1>phaser-vue docs</h1>
        <nav>
          <NuxtLink to="/">
            Overview
          </NuxtLink>
          <NuxtLink to="/guides/getting-started">
            Getting started
          </NuxtLink>
          <NuxtLink to="/guides/performance">
            Performance
          </NuxtLink>
          <NuxtLink to="/guides/nuxt">
            Nuxt
          </NuxtLink>
          <NuxtLink to="/reference/api">
            API
          </NuxtLink>
        </nav>
      </aside>
      <main class="docs-main">
        <NuxtPage />
      </main>
    </div>
  </UApp>
</template>

<style scoped>
.docs-shell {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  min-height: 100vh;
  font-family: ui-sans-serif, system-ui, sans-serif;
}

.docs-nav {
  padding: 2rem;
  background: #08101f;
  color: #e2e8f0;
}

.docs-nav nav {
  display: grid;
  gap: 0.75rem;
}

.docs-nav a {
  color: #93c5fd;
  text-decoration: none;
}

.docs-main {
  padding: 2rem 3rem;
}
</style>
