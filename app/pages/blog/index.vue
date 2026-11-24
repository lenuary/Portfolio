<script setup lang="ts">
const { posts } = useBlog()

useSeoMeta({
  title: 'Blog — Łukasz',
  description: 'Technical articles, development notes, and project write-ups.'
})
</script>

<template>
  <UPageSection
    title="Blog"
    description="All articles and technical notes. This page serves as a clean foundation for future posts."
    :ui="{
      root: 'bg-transparent',
      container: 'max-w-3xl',
      header: 'items-start text-left',
      title: 'text-zinc-50 font-medium tracking-tight',
      description: 'text-zinc-400'
    }"
  >
    <template #headline>
      <div class="flex items-center gap-2">
        <UButton
          to="/#blog"
          color="neutral"
          variant="ghost"
          size="xs"
          icon="i-lucide-arrow-left"
          label="Blog section"
        />
        <UButton
          to="/"
          color="neutral"
          variant="ghost"
          size="xs"
          icon="i-lucide-home"
          label="Home"
        />
      </div>
    </template>

    <div class="flex flex-col divide-y divide-zinc-800/70">
      <article
        v-for="post in posts"
        :key="post.slug"
        class="group flex flex-col items-start gap-1 py-5 first:pt-1 last:pb-1"
      >
        <div class="flex items-center gap-1.5">
          <time class="text-xs font-normal text-zinc-500">{{ post.publishedAt }}</time>
          <span class="text-xs font-normal text-zinc-500">·</span>
          <span class="text-xs font-normal text-zinc-500">{{ post.readTime }}</span>
        </div>

        <h2 class="text-base font-medium leading-snug text-zinc-100 transition-colors group-hover:text-white sm:text-lg">
          <NuxtLink :to="`/blog/${post.slug}`">
            {{ post.title }}
          </NuxtLink>
        </h2>

        <p class="mt-0.5 max-w-2xl text-xs leading-relaxed text-zinc-400 sm:text-sm">
          {{ post.excerpt }}
        </p>

        <div class="mt-1.5">
          <UButton
            :to="`/blog/${post.slug}`"
            color="neutral"
            variant="link"
            label="Read Article"
            size="xs"
            class="px-0 py-0 text-xs font-normal text-zinc-300 underline-offset-4 hover:text-white group-hover:underline"
          />
        </div>
      </article>
    </div>
  </UPageSection>
</template>