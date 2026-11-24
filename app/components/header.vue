<script setup lang="ts">
import { ref, watch } from 'vue'

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

const isOpen = ref(false)
const route = useRoute()

watch(
  () => route.fullPath,
  () => {
    isOpen.value = false
  }
)
</script>

<template>
  <header class="sticky top-0 z-30 w-full border-b border-zinc-800/70 bg-[#0f1115]/80 backdrop-blur-md">
    <div class="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-6 sm:px-10">
      <NuxtLink
        to="/#about"
        class="inline-flex shrink-0 items-center transition-opacity hover:opacity-80 motion-safe:animate-[navFadeIn_0.9s_cubic-bezier(0.22,1,0.36,1)_both]"
        aria-label="Home"
        @click="isOpen = false"
      >
        <img src="/logo.png" alt="Łukasz" class="block h-7 w-auto object-contain" />
      </NuxtLink>

      <nav class="hidden items-center justify-end gap-7 md:flex" aria-label="Primary navigation">
        <NuxtLink
          v-for="(item, index) in navItems"
          :key="item.to"
          :to="item.to"
          :style="{ animationDelay: `${0.15 + index * 0.1}s` }"
          class="whitespace-nowrap text-sm font-normal text-zinc-400 transition-colors hover:text-zinc-50 motion-safe:animate-[navFadeIn_0.9s_cubic-bezier(0.22,1,0.36,1)_both]"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <button
        type="button"
        class="inline-flex items-center justify-center rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800/60 hover:text-zinc-50 md:hidden"
        :aria-expanded="isOpen"
        aria-controls="mobile-nav"
        aria-label="Toggle navigation menu"
        @click="isOpen = !isOpen"
      >
        <UIcon v-if="isOpen" name="i-lucide-x" class="size-5" />
        <UIcon v-else name="i-lucide-menu" class="size-5" />
      </button>
    </div>

    <nav
      v-if="isOpen"
      id="mobile-nav"
      aria-label="Mobile navigation"
      class="border-t border-zinc-800/70 bg-[#0f1115]/95 px-6 py-4 backdrop-blur-md md:hidden"
    >
      <ul class="flex flex-col gap-3">
        <li v-for="item in navItems" :key="item.to">
          <NuxtLink
            :to="item.to"
            class="block py-1.5 text-sm font-normal text-zinc-300 transition-colors hover:text-zinc-50"
            @click="isOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>