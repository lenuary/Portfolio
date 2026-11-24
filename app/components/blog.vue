<script setup lang="ts">
const { posts } = useBlog()
</script>

<template>
  <UPageSection
    id="blog"
    title="Latest Articles"
    description="Some of my recent thoughts & technical notes."
    :ui="{
      root: 'bg-transparent scroll-mt-24 py-12 sm:py-16',
      container: 'max-w-3xl',
      header: 'mb-7',
      title: 'text-xl sm:text-2xl font-medium tracking-tight text-zinc-50',
      description: 'text-xs sm:text-sm text-zinc-400 mt-1'
    }"
  >
    <template #links>
      <UButton
        to="/blog"
        color="neutral"
        variant="link"
        trailing-icon="i-lucide-arrow-right"
        label="All posts"
        size="xs"
        class="px-0 text-zinc-400 hover:text-zinc-100"
      />
    </template>

    <div class="flex flex-col">
      <article
        v-for="post in posts"
        :key="post.slug"
        class="group flex flex-col items-start gap-1 border-b border-zinc-800/70 py-5 first:pt-1 last:border-b-0 last:pb-1"
      >
        <span class="text-xs font-normal text-zinc-500">
          {{ post.publishedAt }}
        </span>

        <h3 class="text-base font-medium leading-snug text-zinc-100 transition-colors group-hover:text-white sm:text-lg">
          <NuxtLink :to="`/blog/${post.slug}`">
            {{ post.title }}
          </NuxtLink>
        </h3>

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