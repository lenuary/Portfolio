<script setup lang="ts">
interface Props {
  title: string
  description: string
  icon?: string
  tags: readonly string[]
}

defineProps<Props>()
</script>

<template>
  <article
    class="group flex h-full w-full flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg transition-[border-color,background-color] duration-200 ease-out hover:border-zinc-600 hover:bg-zinc-800/60"
  >
    <slot name="icon" :icon="icon">
      <UIcon
        v-if="icon"
        :name="icon"
        class="mb-4 block size-6 text-zinc-400 transition-colors duration-200 ease-out group-hover:text-zinc-50"
        aria-hidden="true"
      />
      <svg
        v-else
        class="mb-4 h-6 w-6 text-zinc-400 transition-colors duration-200 ease-out group-hover:text-zinc-50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <polyline points="5 7 10 12 5 17" />
        <line x1="12" y1="18" x2="19" y2="18" />
      </svg>
    </slot>

    <h3 class="mb-3 text-xl font-medium tracking-tight text-zinc-50">{{ title }}</h3>
    <p class="mb-5 text-base leading-relaxed text-zinc-400">{{ description }}</p>

    <ul v-if="tags.length" class="mt-auto flex flex-wrap gap-2">
      <li
        v-for="(tag, index) in tags"
        :key="`${tag}-${index}`"
        class="rounded-md border border-zinc-700/80 bg-zinc-800/60 px-2 py-0.5 font-mono text-xs text-zinc-300"
      >
        {{ tag }}
      </li>
    </ul>
  </article>
</template>
