<script setup lang="ts">
interface NavItem {
  label: string
  to: string
}

const navItems: readonly NavItem[] = [
  { label: 'About', to: '/#about' },
  { label: 'Scope', to: '/#scope' },
  { label: 'Projects', to: '/#projects' },
  { label: 'Blog', to: '/#blog' },
  { label: 'Contact', to: '/#contact' }
]
</script>

<template>
  <header class="site-header">
    <div class="header-inner">
      <NuxtLink to="/" class="logo-link" aria-label="Home">
        <img src="/logo.png" alt="Łukasz" class="brand-logo" />
      </NuxtLink>

      <nav class="nav-links" aria-label="Primary navigation">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.site-header {
  @apply sticky top-0 z-30 w-full bg-[#0f1115]/80 backdrop-blur-md border-b border-zinc-800/70;
}

.header-inner {
  @apply max-w-5xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between gap-4;
}

.logo-link {
  @apply inline-flex items-center shrink-0 opacity-90 hover:opacity-100 transition-opacity;
}

.brand-logo {
  @apply h-7 w-auto object-contain block;
}

.nav-links {
  @apply flex flex-wrap items-center justify-end gap-5 sm:gap-7;
}

.nav-links a {
  @apply text-sm font-normal text-zinc-400 hover:text-zinc-50 transition-colors whitespace-nowrap;
}
</style>