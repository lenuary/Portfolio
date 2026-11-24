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
      <NuxtLink to="/#about" class="logo-link" aria-label="Home">
        <img src="/logo.png" alt="Łukasz" class="brand-logo" />
      </NuxtLink>

      <nav class="nav-links" aria-label="Primary navigation">
        <NuxtLink
          v-for="(item, index) in navItems"
          :key="item.to"
          :to="item.to"
          :style="{ animationDelay: `${0.15 + index * 0.1}s` }"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
@reference "~/assets/css/main.css";

@keyframes navFadeIn {
  0% {
    opacity: 0;
    transform: translateY(-8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.site-header {
  @apply sticky top-0 z-30 w-full bg-[#0f1115]/80 backdrop-blur-md border-b border-zinc-800/70;
}

.header-inner {
  @apply max-w-5xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between gap-4;
}

.logo-link {
  @apply inline-flex items-center shrink-0 opacity-90 hover:opacity-100 transition-opacity;
  opacity: 0;
  animation: navFadeIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.brand-logo {
  @apply h-7 w-auto object-contain block;
}

.nav-links {
  @apply flex flex-wrap items-center justify-end gap-5 sm:gap-7;
}

.nav-links a {
  @apply text-sm font-normal text-zinc-400 hover:text-zinc-50 transition-colors whitespace-nowrap;
  opacity: 0;
  animation: navFadeIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
</style>