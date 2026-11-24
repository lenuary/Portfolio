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
    class="rounded-2xl border border-slate-700/60 bg-slate-950 p-6 shadow-lg transition hover:border-blue-500/50"
  >
    <slot name="icon" :icon="icon">
      <UIcon
        v-if="icon"
        :name="icon"
        class="mb-4 block size-6 text-slate-200"
        aria-hidden="true"
      />
      <svg
        v-else
        class="mb-4 h-6 w-6 text-slate-200"
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

    <h3 class="mb-3 text-xl font-semibold text-slate-100">{{ title }}</h3>
    <p class="mb-5 text-base leading-relaxed text-slate-400">{{ description }}</p>

    <ul v-if="tags.length" class="flex flex-wrap gap-2">
      <li
        v-for="(tag, index) in tags"
        :key="`${tag}-${index}`"
        class="rounded border border-blue-500/40 bg-blue-500/10 px-2 py-0.5 text-xs text-slate-300"
      >
        {{ tag }}
      </li>
    </ul>
  </article>
</template>